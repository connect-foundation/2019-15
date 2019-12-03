const { sendUserListToRoom, isExistRoom } = require('./game');

function exitRoom(gameSocket, { roomType, roomId }) {
  if (!isExistRoom({ roomId, roomType })) return;
  const rooms = this.RoomManager.room;
  const room = rooms[roomType];
  const userList = room[roomId].players;

  const exitUserIdx = userList.findIndex((user) => user.socket.id === gameSocket.id);
  userList.splice(exitUserIdx, 1);

  gameSocket.leave(roomId);
  // 리뷰: 유저리스트를 다보내지 말고 제외된 유저 아이디만 보내자
  sendUserListToRoom(userList, roomId, this.gameIo);
}

module.exports = exitRoom;
