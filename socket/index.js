function initSocketIO(io) {
  io.on('connection', (socket) => {
    publicRoom.roomList.forEach((roomName) => {
      socket.on(`enter_${roomName}`, ({ nickname }) => {
        personEnterRoom(nickname, socket, roomName, io);
      });
    });
