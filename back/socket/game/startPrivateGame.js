const { PRIVATE_ROOM_NAME } = require('../../config/roomConfig');
const { sendUserListToRoom } = require('./game');
const { WAIT_UNTIL_USER_ADD_EVENT } = require('../../config/roomConfig');

function startPrivateGame(gameSocket, { roomId, expireTime, round, categoryId }) {
  const room = this.RoomManager.room[PRIVATE_ROOM_NAME][roomId];
  if (room.isPlayable()) {
    room.timer.expireTime = expireTime * 1000;
    room.totalRound = round;
    room.categoryId = categoryId;
    this.gameIo.to(roomId).emit('movePrivate');
    this.gameIo.to(roomId).emit('roomCategory', { categoryId: room.categoryId });

    setTimeout(() => {
      room.prepareFirstQuestion();
      sendUserListToRoom(room.players, roomId, this.gameIo);
      this.gameIo.to(roomId).emit('gamestart', room.makeGameStartData());
    }, WAIT_UNTIL_USER_ADD_EVENT);
  }
}

module.exports = { startPrivateGame };
