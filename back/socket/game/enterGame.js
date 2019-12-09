const { personEnterRoom, sendUserListToRoom } = require('./game');
const { PRIVATE_ROOM_NAME } = require('../../config/roomConfig');
const User = require('../User');

function enterRandom(gameSocket, roomInfo, { nickname, roomType }) {
  personEnterRoom(nickname, gameSocket, roomType, this.gameIo, roomInfo.roomId);
}

function enterPrivate(gameSocket, { nickname, roomId, roomOwner }) {
  const room = this.RoomManager.room[PRIVATE_ROOM_NAME][roomId];
  room.addPlayer(new User(nickname, gameSocket, null, roomOwner));

  gameSocket.join(roomId);
  gameSocket.emit(`connectRandom`, {
    roomId,
    PRIVATE_ROOM_NAME,
  });

  sendUserListToRoom(room.players, roomId, this.gameIo);
}

module.exports = { enterRandom, enterPrivate };
