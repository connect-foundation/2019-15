const { Room, makeNewRoom } = require('./Room');
const User = require('./user');

function sendUserlistToRoom(list, roomId, io) {
  const userlist = list.map((v) => {
    return { nickname: v.nickname, socketId: v.socket.id };
  });
  io.in(roomId).emit('userlist', { userlist: JSON.stringify(userlist) });
}

function personEnterRoom(nickname, socket, roomName, io) {
  const room = Room.getEnableRoom(roomName);
  room.people.push(User(nickname, socket));

  socket.join(room.roomId);
  socket.emit(`connect_${roomName}`, {
    roomId: room.roomId,
    roomType: roomName,
  });

  sendUserlistToRoom(room.people, room.roomId, io);

  if (room.people.length === 2) {
    io.to(room.roomId).emit('gamestart', { painter: room.people[0].socket.id });
  }
}

function personEnterSecretRoom(nickname, socket, roomId, io) {
  const secretRoomList = Room.room['비밀방'];
  let room;
  const roomIdx = secretRoomList.findIndex((roomObj) => roomObj.roomId === roomId);
  if (roomIdx < 0) {
    room = makeNewRoom(roomId);
    secretRoomList.push(room);
  } else {
    room = secretRoomList[roomIdx];
  }
  socket.join(room.roomId);
  room.people.push(User(nickname, socket));

  console.log(room.people);
}

function initSocketIO(io) {
  io.on('connection', (socket) => {
    Room.roomList.forEach((roomName) => {
      socket.on(`enter_${roomName}`, ({ nickname }) => {
        personEnterRoom(nickname, socket, roomName, io);
      });
    });

    socket.on('get_userlist', ({ roomType, roomId }) => {
      const nRooms = Room.room[roomType];

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

    socket.on('exit_room', ({ nickname, roomType }) => {
      const roomList = Room.room[roomType];

      const removeUserObj = (roomObj) => {
        const userIdx = roomObj.people.findIndex((user) => user.nickname === nickname);
        if (userIdx >= 0) {
          roomObj.people.splice(userIdx, 1);

          sendUserlistToRoom(roomObj.people, roomObj.roomId, io);
          return true;
        }
        return false;
      };

      roomList.some(removeUserObj);
    });
  });
}

module.exports = initSocketIO;
