const Timer = require('../util/timer/Timer');

const { RoomManager, makeNewRoom } = require('./Room');
const User = require('./User');

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
  socket.emit(`connect_${roomName}`, {
    roomId,
    roomType: roomName,
  });

  sendUserlistToRoom(room.players, roomId, io);

  if (room.players.length === 2) {
    io.to(room.roomId).emit('gamestart', { painter: room.players[0].socket.id });
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
      socket.on(`enter_${roomName}`, ({ nickname }) => {
        personEnterRoom(nickname, socket, roomName, io);
      });
    });

    socket.on('get_userlist', ({ roomType, roomId }) => {
      const nRooms = RoomManager.room[roomType];

      const roomIdx = nRooms.findIndex((roomObject) => roomObject.roomId === roomId);

      // 방이 없는 경우
      if (roomIdx < 0) return;

      const userlist = nRooms[roomIdx].people.map((v) => v.id);

      socket.emit('userlist', { userlist: JSON.stringify(userlist) });
    });

    socket.on('make_secret', ({ nickname, roomId }) => {
      personEnterSecretRoom(nickname, socket, roomId, io);
    });

    socket.on('exit_room', ({ nickname, roomType, roomId }) => {
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
