const Timer = require('../util/timer/Timer');
const { RoomManager, makeNewRoom } = require('./Room');
const User = require('./User');
const getRandomInt = require('../util/getRandomInt');

function sendUserlistToRoom(list, roomId, io) {
  const userlist = list.map((v) => {
    return { nickname: v.nickname, socketId: v.socket.id };
  });
  io.in(roomId).emit('userlist', { userlist: JSON.stringify(userlist) });
}

function personEnterRoom(nickname, socket, roomName, io) {
  const roomId = RoomManager.getEnableRoomId(roomName);
  const room = RoomManager.room[roomName][roomId];
  room.players.push(User(nickname, socket));
  room.timer = new Timer();

  socket.join(roomId);
  socket.emit(`connect${roomName}`, {
    roomId,
    roomType: roomName,
  });

  sendUserlistToRoom(room.players, roomId, io);

  if (room.players.length === 2) {
    io.to(roomId).emit('gamestart', { painter: room.players[0].socket.id });
  }
}

function personEnterSecretRoom(nickname, socket, roomId, io) {
  const secretRoomList = RoomManager.room['비밀방'];
  const room = makeNewRoom();
  secretRoomList[roomId] = room;

  socket.join(roomId);
  room.players.push(User(nickname, socket));

  console.log(room.players);
}

function initSocketIO(io) {
  io.on('connection', (socket) => {
    RoomManager.roomList.forEach((roomName) => {
      socket.on(`enter${roomName}`, ({ nickname }) => {
        personEnterRoom(nickname, socket, roomName, io);
      });
    });

    socket.on('getUserlist', ({ roomType, roomId }) => {
      const nRooms = RoomManager.room[roomType];

      const roomIdx = nRooms.findIndex((roomObject) => roomObject.roomId === roomId);

      // 방이 없는 경우
      if (roomIdx < 0) return;

      const userlist = nRooms[roomIdx].people.map((v) => v.id);

      socket.emit('userlist', { userlist: JSON.stringify(userlist) });
    });

    socket.on('makeSecret', ({ nickname, roomId }) => {
      personEnterSecretRoom(nickname, socket, roomId, io);
    });

    socket.on('exitRoom', ({ nickname, roomType, roomId }) => {
      const roomObject = RoomManager.room[roomType];
      const exitUserIdx = roomObject[roomId].players.findIndex((user) => {
        if (user.nickname === nickname) {
          user.socket.disconnect();
          return true;
        }
        return false;
      });

      roomObject[roomId].players.splice(exitUserIdx);
    });

    socket.on('sendMessage', ({ nickname, roomId, inputValue }) => {
      io.in(roomId).emit('getMessage', { message: `${nickname} : ${inputValue}` });
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
