const User = require('../User');
const { RoomManager } = require('../RoomManager');

function sendUserListToRoom(list, roomId, io) {
  const userList = list.map((user) => {
    const userName = user.nickname || '부스트캠퍼';
    return {
      nickname: userName,
      socketId: user.socket.id,
      avatar: user.avatar,
      privileged: user.privileged,
      roomOwner: user.roomOwner,
    };
  });
  io.in(roomId).emit('userList', { playerList: JSON.stringify(userList) });
}

module.exports = {
  sendUserListToRoom,
};
