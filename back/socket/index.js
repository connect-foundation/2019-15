const Timer = require('../util/timer/Timer');

const { RoomManager, Room } = require('./Room');
const User = require('./User');
const getRandomInt = require('../util/getRandomInt');
const setOnlineSockets = require('./online');

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

  socket.join(roomId);
  room.players.push(new User(nickname, socket));
  sendUserListToRoom(room.players, roomId, io);
}

function initSocketIO(io) {
  io.on('connection', (socket) => {
    let userName;
    let roomInfo;
    const socketId = socket.id;

    RoomManager.roomList.forEach((roomName) => {
      socket.on(`enter${roomName}`, ({ nickname }) => {
        personEnterRoom(nickname, socket, roomName, io);
        userName = nickname;
      });
    });

    socket.on('getUserList', ({ roomType, roomId }) => {
      const nRooms = RoomManager.room[roomType];

      const roomIdx = nRooms.findIndex((roomObject) => roomObject.roomId === roomId);

      // 방이 없는 경우
      if (roomIdx < 0) return;

      roomInfo = { roomId, roomType };
      const userList = nRooms[roomIdx].people.map((v) => v.id);

      socket.emit('userList', { userList: JSON.stringify(userList) });
    });

  });
}

module.exports = initSocketIO;
