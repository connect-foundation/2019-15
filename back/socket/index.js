const Timer = require('../util/timer/Timer');

const { RoomManager, Room } = require('./Room');
const User = require('./User');

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
  socket.emit(`connect_${roomName}`, {
    roomId,
    roomType: roomName,
  });

  sendUserListToRoom(room.players, roomId, io);

  if (room.players.length === 2) {
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
      socket.on(`enter_${roomName}`, ({ nickname }) => {
        personEnterRoom(nickname, socket, roomName, io);
        userName = nickname;
      });
    });

    socket.on('get_userList', ({ roomType, roomId }) => {
      const nRooms = RoomManager.room[roomType];

      const roomIdx = nRooms.findIndex((roomObject) => roomObject.roomId === roomId);

      // 방이 없는 경우
      if (roomIdx < 0) return;
      roomInfo = { roomId, roomType };
      const userList = nRooms[roomIdx].people.map((v) => v.id);

      socket.emit('userList', { userList: JSON.stringify(userList) });
    });

    socket.on('make_secret', ({ nickname, roomId }) => {
      personEnterSecretRoom(nickname, socket, roomId, io);
      userName = nickname;
      roomInfo = { roomId, roomType: '비밀방' };
    });

    socket.on('startSecretGame', ({ roomId, roomType }) => {
      const room = RoomManager.room[roomType][roomId];
      if (room.players.length >= 2) {
        io.to(roomId).emit('startSecretGame', { painter: room.players[0].socket.id });
      }
    });

    socket.on('exit_room', ({ nickname, roomType, roomId }) => {
      if (!roomType || !roomId) return;
      const room = RoomManager.room[roomType][roomId];
      const exitUserIdx = room.players.findIndex((user) => user.socket.id === socketId);
      room.players.splice(exitUserIdx, 1);
      sendUserListToRoom(room.players, roomId, io);
    });

    socket.on('disconnect', () => {
      if (roomInfo) {
        const userList = RoomManager.room[roomInfo.roomType][roomInfo.roomId].players;
        const userIdx = userList.findIndex((user) => user.socket.id === socketId);
        if (userIdx >= 0) {
          userList.splice(userIdx, 1);
          sendUserListToRoom(userList, roomInfo.roomId, io);
        }
      }
    });
  });

  // 출제자가 단어를 선택한 경우, 문제을 시작
  io.on('questionStart', () => {
    // 서버 타이머 트리거
  });
  // 출제자가 캔버스에 그림을 그리는 경우.
  io.on('drawing', ({ roomId }) => {
    // 출제자를 제외한 참가자들에게 캔버스 정보를 전송
    io.to(roomId).emit('drawing');
  });
  // 출제자를 포함한 참가자들이 채팅을 하는 경우.
  // 단, 권한에 따라 다른 유저의 채팅이 안 보일 수 있다.
  io.on('chatting', () => {
    // 정답이 아닌 경우
    // 정답인 경우
  });
}

module.exports = initSocketIO;
