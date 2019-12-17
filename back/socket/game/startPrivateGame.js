const { PRIVATE_ROOM_NAME } = require('../../config/roomConfig');
const { sendUserListToRoom } = require('./game');

function startPrivateGame(gameSocket, { roomId, expireTime, round, categoryId }) {
  const room = this.RoomManager.room[PRIVATE_ROOM_NAME][roomId];
  if (room.isPlayable()) {
    room.timer.expireTime = expireTime * 1000;
    room.totalRound = round;
    room.categoryId = categoryId;
    this.gameIo.to(roomId).emit('movePrivate');

    setTimeout(() => {
      room.prepareFirstQuestion();
      sendUserListToRoom(room.players, roomId, this.gameIo);
      this.gameIo.to(roomId).emit('gamestart', room.makeGameStartData());
    }, 1000);
  }
}

module.exports = { startPrivateGame };
