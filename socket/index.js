const { RoomManager, Room } = require('./Room');

function initSocketIO(io) {
    socket.on('sendMessage', ({ socketId, roomType, roomId, inputValue }) => {
      let answer;
      try {
        answer = RoomManager.room[roomType][roomId].word;
      } catch {
        answer = null;
      }
      RoomManager.room[roomType][roomId].players.findIndex((user) => {
        if (user.socket.id === socketId) {
          if (inputValue === answer && !user.privileged) {
            user.privileged = true;
            io.in(roomId).emit('getMessage', {
              content: `${user.nickname}님이 정답을 맞췄습니다! Hooray`,
              privileged: 'notice',
            });
          } else {
            io.in(roomId).emit('getMessage', {
              content: `${user.nickname} : ${inputValue}`,
              privileged: user.privileged,
            });
          }
        }
      });
    });

    socket.on('selectWord', ({ answer, roomType, roomId }) => {
      const room = RoomManager.room[roomType][roomId];
      room.word = answer;
    });

}

module.exports = initSocketIO;
