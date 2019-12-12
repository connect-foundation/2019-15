const User = require('../User');
const { RoomManager } = require('../RoomManager');

function sendUserListToRoom(list, roomId, io) {
  const userList = list.map((user) => {
    const userName = user.nickname || '부스트캠퍼';
    return {
      nickname: userName,
      socketId: user.socket.id,
      avatar: user.avatar,
      privileged: user.privileged,
      roomOwner: user.roomOwner,
    };
  });
  io.in(roomId).emit('userList', { userList: JSON.stringify(userList) });
}

function personEnterRoom(nickname, socket, roomType, io, roomId, avatar) {
  const room = RoomManager.room[roomType][roomId];
  room.addPlayer(new User(nickname, socket, null, false, avatar));

  socket.join(roomId);
  socket.emit(`connectRandom`, {
    roomId,
    roomType,
  });

  if (room.isPlayable()) {
    room.prepareFirstQuestion();
    io.to(roomId).emit('gamestart', room.makeGameStartData());
  } else if (room.isPlaying()) {
    socket.emit('gamestart', room.makeGameStartData());
    socket.emit('startQuestion', room.makeStartQuestionData());
  }

  sendUserListToRoom(room.players, roomId, io);

  return { roomId, roomType };
}

function personEnterPrivateRoom(nickname, socket, roomId, io) {
  const room = RoomManager.getEnablePrivateRoom(roomId);
  socket.join(roomId);
  room.addPlayer(new User(nickname, socket));
  sendUserListToRoom(room.players, roomId, io);
}

module.exports = {
  sendUserListToRoom,
  personEnterRoom,
  personEnterPrivateRoom,
};
