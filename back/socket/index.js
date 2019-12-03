const setOnlineSockets = require('./online');
const setGameSocket = require('./game');

function initSocketIO(io) {
  this.io = io;
  this.gameIo = io.of('/game').on('connection', setGameSocket.bind(this));
  this.onlineIo = io.of('/online').on('connection', setOnlineSockets.bind(this));
}

module.exports = initSocketIO;
