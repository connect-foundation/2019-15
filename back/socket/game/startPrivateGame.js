const { PRIVATE_ROOM_NAME } = require('../../config/roomConfig');
const { sendUserListToRoom } = require('./game');
const { WAIT_UNTIL_USER_ADD_EVENT } = require('../../config/roomConfig');

function startPrivateGame(gameSocket, { roomId, timer, round, category }) {
  const room = this.RoomManager.room[PRIVATE_ROOM_NAME][roomId];
  if (room.isPlayable()) {
    this.gameIo.to(roomId).emit('movePrivate');

    setTimeout(() => {
      room.prepareFirstQuestion();
      sendUserListToRoom(room.players, roomId, this.gameIo);
      this.gameIo.to(roomId).emit('gamestart', room.makeGameStartData());
    }, WAIT_UNTIL_USER_ADD_EVENT);
  }
}

module.exports = { startPrivateGame };
