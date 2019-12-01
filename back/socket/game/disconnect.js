const { sendUserListToRoom } = require('../game/game');
const { isExistRoom } = require('./game');

function disconnect() {
  if (!this.roomInfo) return;
  if (!isExistRoom(this.roomInfo)) return;

  const { roomType, roomId } = this.roomInfo;
  const userList = this.RoomManager.room[roomType][roomId].players;
  const userIdx = userList.findIndex((user) => user.socket.id === this.socketId);
  if (userIdx >= 0) {
    userList.splice(userIdx, 1);

    const sendUserList = sendUserListToRoom.bind(this);
    sendUserList(userList, roomId, this.gameIo);
    this.socket.leave(roomId);
  }
}

module.exports = disconnect;
