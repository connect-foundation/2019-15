const Timer = require('../util/timer/Timer');
const { RoomManager, Room } = require('./Room');
const User = require('./User');
const getRandomInt = require('../util/getRandomInt');

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
  room.timer = new Timer(roomId, roomName, io);

  socket.join(roomId);
  socket.emit(`connect${roomName}`, {
    roomId,
    roomType: roomName,
  });

  sendUserListToRoom(room.players, roomId, io);

  if (room.players.length === 2) {
    room.currentExaminer = room.players.length - 1;
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

    socket.on('makeSecret', ({ nickname, roomId }) => {
      personEnterSecretRoom(nickname, socket, roomId, io);
      userName = nickname;
      roomInfo = { roomId, roomType: '비밀방' };
    });

    socket.on('startSecretGame', ({ roomId, roomType }) => {
      const room = RoomManager.room[roomType][roomId];
      if (room.players.length >= 2) {
        io.to(roomId).emit('startSecretGame', {
          painter: room.players[room.players.length - 1].socket.id,
        });
      }
    });

    socket.on('exitRoom', ({ nickname, roomType, roomId }) => {
      const userList = RoomManager.room[roomType][roomId].players;
      const exitUserIdx = userList.findIndex((user) => user.socket.id === socketId);
      userList.splice(exitUserIdx, 1);

      sendUserListToRoom(userList, roomId, io);
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

    socket.on('sendMessage', ({ nickname, roomId, inputValue }) => {
      // 클라에게 뿌려주기
      io.in(roomId).emit('getMessage', { message: `${nickname} : ${inputValue}` });
      // 정답 판단하기
    });

    socket.on('selectWord', ({ answer, roomType, roomId }) => {
      const room = RoomManager.room[roomType][roomId];
      room.word = answer;
      // 서버 타이머 트리거
      room.timer.start();
      // 클라들에게 뿌려주기
      const openIndex = getRandomInt(0, answer.length);
      io.in(roomId).emit('startQuestion', {
        wordLength: answer.length,
        openLetter: answer[openIndex],
        openIndex,
      });
    });

    // 출제자가 캔버스에 그림을 그리는 경우.
    socket.on('drawing', ({ roomId }) => {
      // 출제자를 제외한 참가자들에게 캔버스 정보를 전송
      io.to(roomId).emit('drawing');
    });
  });
}

module.exports = initSocketIO;
