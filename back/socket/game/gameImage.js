function sendGameImage(gameSocket, { roomId, image }) {
  gameSocket.to(roomId).emit('drawing', { image });
}

module.exports = sendGameImage;
