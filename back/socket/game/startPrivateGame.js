const { PRIVATE_ROOM_NAME } = require('../../config/roomConfig');
const { sendUserListToRoom } = require('./game');

function startPrivateGame(gameSocket, { roomId }) {
  // 난입 시나리오 추가해야됨
  const room = this.RoomManager.room[PRIVATE_ROOM_NAME][roomId];
  if (room.isPlayable()) {
    this.gameIo.to(roomId).emit('movePrivate');
  }
  setTimeout(() => {
    sendUserListToRoom(room.players, roomId, this.gameIo);
    if (room.isPlayable()) {
      room.prepareFirstQuestion();
      this.gameIo.to(roomId).emit('gamestart', {
        painter: room.getExaminerSocketId(),
        currentRound: room.currentRound,
        totalRound: room.totalRound,
      });
    } else if (room.isPlaying()) {
      gameSocket.emit('gamestart', {
        painter: room.getExaminerSocketId(),
        currentRound: room.currentRound,
        totalRound: room.totalRound,
      });
    }
  }, 1500);
}

module.exports = { startPrivateGame };
