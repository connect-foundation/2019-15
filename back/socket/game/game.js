const Timer = require('../../util/timer/Timer');
const User = require('../User');
const { RoomManager, Room } = require('../Room');

function sendUserListToRoom(list, roomId, io) {
  const userList = list.map((user) => {
    const userName = user.nickname || '부스트캠퍼';
    return { nickname: userName, socketId: user.socket.id };
  });
  io.in(roomId).emit('userList', { userList: JSON.stringify(userList) });
}

function personEnterRoom(nickname, socket, roomType, io, roomId) {
  const room = RoomManager.room[roomType][roomId];
  room.players.push(new User(nickname, socket));
  room.timer = new Timer();

  socket.join(roomId);
  socket.emit(`connect${roomType}`, {
    roomId,
    roomType,
  });

  sendUserListToRoom(room.players, roomId, io);

  if (room.players.length === 2) {
    room.currentExaminer = 0;
    room.players[0].privileged = true;
    io.to(roomId).emit('gamestart', { painter: room.players[0].socket.id });
  }
  return { roomId, roomType };
}

function personEnterSecretRoom(nickname, socket, roomId, io) {
  const secretRoomList = RoomManager.room['비밀방'];

  let room;
  if (secretRoomList.hasOwnProperty(roomId)) {
    room = secretRoomList[roomId];
  } else {
    room = new Room();
    secretRoomList[roomId] = room;
  }
  room.timer = new Timer();
  socket.join(roomId);
  room.players.push(new User(nickname, socket));
  sendUserListToRoom(room.players, roomId, io);
}

function isExistRoom({ roomId, roomType }) {
  const rooms = RoomManager.room;
  if (!roomType) return false;

  const room = rooms[roomType];
  if (!roomId || !room.hasOwnProperty(roomId)) return false;

  return true;
}

module.exports = {
  sendUserListToRoom,
  personEnterRoom,
  personEnterSecretRoom,
  isExistRoom,
};
