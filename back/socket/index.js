function initSocketIO(io) {
  io.on('connection', socket => {
    socket.on('enter_3', data => {
      //
    });
    socket.on('enter_6', data => {
      //
    });
    socket.on('enter_12', data => {
      //
    });
    socket.on('enter_100', data => {
      //
    });
  });
}

module.exports = initSocketIO;
