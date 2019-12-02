function sendGameImage(gameSocket, { roomId, image }) {
  gameSocket.to(roomId).emit('gameImage', { image });
}

module.exports = sendGameImage;
