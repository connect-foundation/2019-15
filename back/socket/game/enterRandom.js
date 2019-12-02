const { personEnterRoom } = require('./game');

function enterRandom(gameSocket, { nickname, roomType }) {
  this.roomInfo = personEnterRoom(nickname, gameSocket, roomType, this.gameIo);
}

module.exports = enterRandom;
