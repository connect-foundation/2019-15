const { personEnterRoom, sendUserListToRoom } = require('./game');
const { PRIVATE_ROOM_NAME } = require('../../config/roomConfig');
const User = require('../User');

function enterRandom(gameSocket, roomInfo, { nickname, roomType }) {
  personEnterRoom(nickname, gameSocket, roomType, this.gameIo, roomInfo.roomId);
}

function enterPrivate(gameSocket, { nickname, roomId, roomOwner, avatar }) {
  const room = this.RoomManager.room[PRIVATE_ROOM_NAME][roomId];
  if (!room) return;

  if (room.players.length === 0) {
    room.roomOwner = gameSocket.id;
  }

  room.addPlayer(new User(nickname, gameSocket, null, roomOwner, avatar));

  gameSocket.join(roomId);

  setTimeout(() => {
    sendUserListToRoom(room.players, roomId, this.gameIo);
  }, 0);

  if (room.isPlaying()) {
    gameSocket.emit('movePrivate');

    setTimeout(() => {
      sendUserListToRoom(room.players, roomId, this.gameIo);

      gameSocket.emit('gamestart', room.makeGameStartData());
      gameSocket.emit('startQuestion', room.makeStartQuestionData());
    }, 1000);
  }
}

module.exports = { enterRandom, enterPrivate };
