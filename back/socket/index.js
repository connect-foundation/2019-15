const publicRoom = require('./Room');
const User = require('./user');

function personEnterRoom(nickname, socket, capacity, io) {
  const room = publicRoom.getEnableRoom(capacity);
  room.people.push(User(nickname, socket));

  socket.join(room.roomId);
  socket.emit(`connect_${capacity}`, {
    roomId: room.roomId,
    roomType: capacity,
  });

  const userlist = room.people.map((v) => {
    return { nickname: v.nickname, socketId: v.socket.id };
  });
  io.in(room.roomId).emit('userlist', { userlist: JSON.stringify(userlist) });

  if (room.people.length === 2) {
    io.to(room.roomId).emit('gamestart', { painter: room.people[0].socket.id });
  }
}

function initSocketIO(io) {
  io.on('connection', (socket) => {
    publicRoom.roomList.forEach((roomName) => {
      socket.on(`enter_${roomName}`, ({ nickname }) => {
        personEnterRoom(nickname, socket, roomName, io);
      });
    });

    socket.on('get_userlist', ({ roomType, roomId }) => {
      const nRooms = publicRoom.room[roomType];

      const roomIdx = nRooms.findIndex((roomObject) => roomObject.roomId === roomId);

      if (roomIdx < 0) {
        // 방이 없는 경우
        return;
      }
      const userlist = nRooms[roomIdx].people.map((v) => v.id);

      socket.emit('userlist', { userlist: JSON.stringify(userlist) });
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
