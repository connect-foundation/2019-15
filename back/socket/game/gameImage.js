function sendGameImage(gameSocket, { roomId, canvasData }) {
  gameSocket.to(roomId).emit('drawing', { canvasData });
}

module.exports = sendGameImage;
