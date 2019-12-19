function exitRoom(gameSocket, roomInfo) {
  if (!roomInfo) return;

  const { roomType, roomId } = roomInfo;
  if (!this.RoomManager.isExistRoom({ roomId, roomType })) return;

  const room = this.RoomManager.getRoom(roomInfo);
  const userIndex = room.getUserIndexBySocketId(gameSocket);
  if (userIndex < 0) return; // 방에서 유저 정보를 못 찾은경우 종료

  room.removePlayer(userIndex);

  gameSocket.leave(roomId);

  if (gameSocket.id === room.roomOwner) {
    room.passRoomOwnerToNext();
  }
  room.sendUserList(this.gameIo);
}

module.exports = exitRoom;
