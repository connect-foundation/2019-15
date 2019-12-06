function sendGameImage(gameSocket, { roomId, eventList }) {
  gameSocket.to(roomId).emit('drawing', { eventList });
}

module.exports = sendGameImage;
