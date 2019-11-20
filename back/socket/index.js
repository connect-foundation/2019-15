const publicRoom = require('./Room');

function User(id, socket) {
  return { id, socket };
}

function personEnterRoom(userId, socket, capacity) {
  const room = publicRoom.getEnableRoom(capacity);
  room.people.push(User(userId, socket));

  socket.join(room.roomId);
  socket.emit(`connect_${capacity}`, {
    roomId: room.roomId,
    roomType: capacity,
  });

  const userlist = room.people.map((v) => v.id);
  socket.broadcast.to(room.roomId).emit('userlist', { userlist: JSON.stringify(userlist) });
}

function initSocketIO(io) {
  io.on('connection', (socket) => {
    socket.on('enter_3명', ({ userId }) => {
      personEnterRoom(userId, socket, '3명');
    });
    socket.on('enter_6명', ({ userId }) => {
      personEnterRoom(userId, socket, '6명');
    });
    socket.on('enter_12명', ({ userId }) => {
      personEnterRoom(userId, socket, '12명');
    });
    socket.on('enter_100명', ({ userId }) => {
      personEnterRoom(userId, socket, '100명');
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
