function sendMessage(gameSocket, { roomType, roomId, inputValue }) {
  let answer;
  try {
    answer = this.RoomManager.room[roomType][roomId].word;
  } catch {
    answer = null;
  }

  const room = this.RoomManager.room[roomType][roomId];
  const idx = room.players.findIndex((user) => user.socket.id === gameSocket.id);
  if (idx <= 0) return;

  const player = room.players[idx];

  if (inputValue === answer && !player.privileged) {
    player.privileged = true;
    this.gameIo.in(roomId).emit('getMessage', {
      content: `${player.nickname}님이 정답을 맞췄습니다! Hooray`,
      privileged: 'notice',
    });
  } else {
    this.gameIo.in(roomId).emit('getMessage', {
      content: `${player.nickname} : ${inputValue}`,
      privileged: player.privileged,
    });
  }
}

module.exports = { sendMessage };
