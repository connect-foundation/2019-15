const { sendUserListToRoom } = require('../game/game');
const { isExistRoom } = require('./game');

function disconnect(gameSocket) {
  if (!this.roomInfo) return;
  if (!isExistRoom(this.roomInfo)) return;

  const { roomType, roomId } = this.roomInfo;
  const userList = this.RoomManager.room[roomType][roomId].players;
  const userIdx = userList.findIndex((user) => user.socket.id === gameSocket.id);
  if (userIdx >= 0) {
    userList.splice(userIdx, 1);

    sendUserListToRoom(userList, roomId, this.gameIo);
    gameSocket.leave(roomId);
  }
}

module.exports = disconnect;
