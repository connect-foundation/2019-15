const { PRIVATE_ROOM_NAME } = require('../../config/roomConfig');
const { sendUserListToRoom } = require('./game');

function startPrivateGame(gameSocket, { roomId }) {
  // 난입 시나리오 추가해야됨
  const room = this.RoomManager.room[PRIVATE_ROOM_NAME][roomId];
  if (room.isPlayable()) {
    this.gameIo.to(roomId).emit('movePrivate');

    setTimeout(() => {
      room.prepareFirstQuestion();
      sendUserListToRoom(room.players, roomId, this.gameIo);
      this.gameIo.to(roomId).emit('gamestart', room.makeGameStartData());
    }, 1000);
  }
}

module.exports = { startPrivateGame };
