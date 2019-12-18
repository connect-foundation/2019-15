const { personEnterRoom, sendUserListToRoom } = require('./game');
const { PRIVATE_ROOM_NAME } = require('../../config/roomConfig');
const User = require('../User');

function enterRandom(gameSocket, roomInfo, { nickname, roomType, avatar }) {
  personEnterRoom(nickname, gameSocket, roomType, this.gameIo, roomInfo.roomId, avatar);
}

function enterPrivate(gameSocket, { nickname, roomId, avatar }) {
  const room = this.RoomManager.room[PRIVATE_ROOM_NAME][roomId];
  if (!room) return;

  let roomOwner = false;
  if (room.players.length === 0) {
    room.roomOwner = gameSocket.id;
    roomOwner = true;
  }

  room.addPlayer(new User(nickname, gameSocket, null, roomOwner, avatar));

  gameSocket.join(roomId);

  room.checkAndEmitRoomOwner(gameSocket.id, gameSocket);
  setTimeout(() => {
    sendUserListToRoom(room.players, roomId, this.gameIo);
  }, 0);

  if (room.isPlayingQuestion()) {
    setTimeout(() => {
      gameSocket.emit('movePrivate');
    }, 100);

    setTimeout(() => {
      sendUserListToRoom(room.players, roomId, this.gameIo);

      gameSocket.emit('gamestart', room.makeGameStartData());
      gameSocket.emit('startQuestion', room.makeStartQuestionData());
    }, WAIT_UNTIL_USER_ADD_EVENT);
  }
}

module.exports = { enterRandom, enterPrivate };
