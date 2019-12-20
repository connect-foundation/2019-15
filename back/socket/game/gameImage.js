function sendGameImage(gameSocket, roomInfo, { eventList }) {
  gameSocket.to(roomInfo.roomId).emit('drawing', { eventList });
}

module.exports = sendGameImage;
