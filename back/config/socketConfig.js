const socketConfig = {
  cookieHttpOnly: true,
  pingTimeout: 5000,
  pingInterval: 60000,
  transports: ['websocket'],
};
module.exports = socketConfig;
