const { WAIT_UNTIL_USER_ADD_EVENT } = require('../../config/roomConfig');

function startPrivateGame(gameSocket, roomInfo, { expireTime, round, categoryId }) {
  const { roomId } = roomInfo;
  const room = this.RoomManager.getRoom(roomInfo);
  if (room.isPlayable()) {
    room.timer.expireTime = expireTime * 1000; // 밀리초
    room.totalRound = round;
    room.categoryId = categoryId;
    this.gameIo.to(roomId).emit('movePrivate');
    this.gameIo.to(roomId).emit('roomCategory', { categoryId: room.categoryId });

    setTimeout(() => {
      room.prepareFirstQuestion();
      room.sendUserList(this.gameIo);
      this.gameIo.to(roomId).emit('gamestart', room.makeGameStartData());
    }, WAIT_UNTIL_USER_ADD_EVENT);
  }
}

module.exports = { startPrivateGame };
