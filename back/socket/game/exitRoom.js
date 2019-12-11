const { sendUserListToRoom } = require('./game');
const { RoomManager } = require('../RoomManager');

function exitRoom(gameSocket, { roomType, roomId }) {
  if (!RoomManager.isExistRoom({ roomId, roomType })) return;

  const room = RoomManager.room[roomType][roomId];
  const userIndex = room.getUserIndexBySocketId(gameSocket);
  room.removePlayer(userIndex);

  gameSocket.leave(roomId);
  // 리뷰: 유저리스트를 다보내지 말고 제외된 유저 아이디만 보내자
  sendUserListToRoom(room.players, roomId, this.gameIo);

  if (gameSocket.id === room.roomOwner) {
    room.passRoomOwnerToNext();
  }
}

module.exports = exitRoom;
