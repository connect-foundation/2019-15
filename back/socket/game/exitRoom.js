const { sendUserListToRoom } = require("./game");
const { RoomManager } = require("../Room");

function exitRoom(gameSocket, { roomType, roomId }) {
  if (!RoomManager.isExistRoom({ roomId, roomType })) return;

  const room = RoomManager.room[roomType][roomId];
  const userIndex = room.getUserIndexBySocketId(gameSocket);
  room.removePlayer(userIndex);

  gameSocket.leave(roomId);

  sendUserListToRoom(room.players, roomId, this.gameIo);
}

module.exports = exitRoom;
