function sendGameImage({ roomId, image }) {
  this.gameSocket.to(roomId).emit('gameImage', { image });
}

module.exports = sendGameImage;
