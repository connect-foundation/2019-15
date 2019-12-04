const User = require('../User');
const { RoomManager } = require('../Room');

function sendUserListToRoom(list, roomId, io) {
  const userList = list.map((user) => {
    const userName = user.nickname || '부스트캠퍼';
    return { nickname: userName, socketId: user.socket.id };
  });
  io.in(roomId).emit('userList', { userList: JSON.stringify(userList) });
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
  // 최소 시작 인원이 충족된 경우
  if (room.isPlayable()) {
    room.prepareFirstQuestion();

    io.to(roomId).emit('gamestart', { painter: room.players[room.examinerIndex].socket.id });
  }
  return { roomId, roomType };
}

function personEnterSecretRoom(nickname, socket, roomId, io) {
  const room = RoomManager.getEnableSecretRoom(roomId);
  socket.join(roomId);
  room.addPlayer(new User(nickname, socket));
  sendUserListToRoom(room.players, roomId, io);
}

module.exports = {
  sendUserListToRoom,
  personEnterRoom,
  personEnterSecretRoom,
};
