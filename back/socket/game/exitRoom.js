const { RoomManager } = require('../RoomManager');

function exitRoom(gameSocket, { roomType, roomId }) {
  if (!RoomManager.isExistRoom({ roomId, roomType })) return;

  const room = RoomManager.room[roomType][roomId];
  const userIndex = room.getUserIndexBySocketId(gameSocket);
  room.removePlayer(userIndex);

  gameSocket.leave(roomId);

  if (gameSocket.id === room.roomOwner) {
    room.passRoomOwnerToNext();
  }
  room.sendUserList(this.gameIo);
}

module.exports = exitRoom;
