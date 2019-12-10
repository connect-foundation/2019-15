const User = require('../User');
const { RoomManager } = require('../RoomManager');

function sendUserListToRoom(list, roomId, io) {
  const userList = list.map((user) => {
    const userName = user.nickname || '부스트캠퍼';
    return { nickname: userName, socketId: user.socket.id };
  });
  io.in(roomId).emit('userList', { userList: JSON.stringify(userList) });
}

function makeRoomData(room) {
  return {
    painter: room.getExaminerSocketId(),
    currentRound: room.currentRound,
    totalRound: room.totalRound,
  };
}

function personEnterRoom(nickname, socket, roomType, io, roomId) {
  const room = RoomManager.room[roomType][roomId];
  room.addPlayer(new User(nickname, socket));

  socket.join(roomId);
  socket.emit(`connectRandom`, {
    roomId,
    roomType,
  });

  sendUserListToRoom(room.players, roomId, io);

  if (room.isPlayable()) {
    room.prepareFirstQuestion();
    io.to(roomId).emit('gamestart', makeRoomData(room));
  }
  if (room.isPlaying()) {
    socket.emit('gamestart', makeRoomData(room));
  }

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
