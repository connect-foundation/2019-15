const { sendUserListToRoom } = require('./game');

function exitRoom({ nickname, roomType, roomId }) {
  const rooms = this.RoomManager.room;
  if (!roomType) return;

  const room = rooms[roomType];
  if (!roomId || !(roomId in room)) return;

  const userList = room[roomId].players;

  const exitUserIdx = userList.findIndex((user) => user.socket.id === this.socketId);
  userList.splice(exitUserIdx, 1);

  // 리뷰: 유저리스트를 다보내지 말고 제외된 유저 아이디만 보내자
  sendUserListToRoom.bind(this);
  sendUserListToRoom(userList, roomId, this.gameIo);
}

module.exports = exitRoom;
