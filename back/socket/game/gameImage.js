function sendGameImage(gameSocket, roomInfo, { eventList }) {
  if (!roomInfo) return;
  gameSocket.to(roomInfo.roomId).emit('drawing', { eventList });
}

module.exports = sendGameImage;
