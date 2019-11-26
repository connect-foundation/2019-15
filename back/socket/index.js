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

      if (roomIdx < 0) {
        // 방이 없는 경우
        return;
      }
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
}

module.exports = initSocketIO;
