const Timer = require('../../util/timer/Timer');

const { RoomManager, Room } = require('../Room');
const User = require('../User');

function sendUserListToRoom(list, roomId, io) {
  const userList = list.map((v) => {
    const userName = v.nickname || '부스트캠퍼';
    return { nickname: userName, socketId: v.socket.id };
  });
  io.in(roomId).emit('userList', { userList: JSON.stringify(userList) });
}

function personEnterRoom(nickname, socket, roomName, io) {
  const roomId = RoomManager.getEnableRoomId(roomName);
  const room = RoomManager.room[roomName][roomId];
  room.players.push(new User(nickname, socket));
  room.timer = new Timer();

  socket.join(roomId);
  socket.emit(`connect${roomName}`, {
    roomId,
    roomType: roomName,
  });

  sendUserListToRoom(room.players, roomId, io);

  if (room.players.length === 2) {
    room.currentExaminer = 0;
    room.players[0].privileged = true;
    io.to(roomId).emit('gamestart', { painter: room.players[0].socket.id });
  }
  return { roomId, roomType: roomName };
}

function personEnterSecretRoom(nickname, socket, roomId, io) {
  const secretRoomList = RoomManager.room['비밀방'];

  let room;
  if (roomId in secretRoomList) {
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
  if (!roomId || !(roomId in room)) return false;

  return true;
}

function sendImageToUser({ roomId, image }) {
  this.socket.to(roomId).emit('gameImage', { image });
}
module.exports = {
  sendUserListToRoom,
  personEnterRoom,
  personEnterSecretRoom,
  isExistRoom,
  sendImageToUser,
};
