const { personEnterRoom } = require('./game');

function enterRandom(gameSocket, roomInfo, { nickname, roomType }) {
  personEnterRoom(nickname, gameSocket, roomType, this.gameIo, roomInfo.roomId);
}

module.exports = enterRandom;
