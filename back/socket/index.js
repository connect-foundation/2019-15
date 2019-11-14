const publicRoom = require('./Room');

function personEnterRoom(socket, messageToClient, capacity) {
  const room = publicRoom.getEnableRoom(capacity);
  room.people += 1;
  socket.emit(messageToClient, room.roomid);
}

function initSocketIO(io) {
  io.on('connection', socket => {
    socket.on('enter_3', data => {
      personEnterRoom(socket, 'connect_3', 3);
    });
    socket.on('enter_6', data => {
      personEnterRoom(socket, 'connect_6', 6);
    });
    socket.on('enter_12', data => {
      personEnterRoom(socket, 'connect_12', 12);
    });
    socket.on('enter_100', data => {
      personEnterRoom(socket, 'connect_100', 100);
    });
  });
}

module.exports = initSocketIO;
