function sendMessage({ socketId, roomType, roomId, inputValue }) {
  let answer;
  try {
    answer = this.RoomManager.room[roomType][roomId].word;
  } catch {
    answer = null;
  }
  this.RoomManager.room[roomType][roomId].players.findIndex((user) => {
    if (user.socket.id === socketId) {
      if (inputValue === answer && !user.privileged) {
        user.privileged = true;
        this.gameIo.in(roomId).emit('getMessage', {
          content: `${user.nickname}님이 정답을 맞췄습니다! Hooray`,
          privileged: 'notice',
        });
      } else {
        this.gameIo.in(roomId).emit('getMessage', {
          content: `${user.nickname} : ${inputValue}`,
          privileged: user.privileged,
        });
      }
    }
  });
}

module.exports = { sendMessage };
