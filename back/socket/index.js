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

  const userlist = room.people.map((v) => v.id);
  socket.broadcast.to(room.roomId).emit('userlist', { userlist: JSON.stringify(userlist) });

  if (room.people.length === 2) {
    io.to(room.roomId).emit('gamestart', { painter: room.people[0].id });
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
}

module.exports = initSocketIO;
