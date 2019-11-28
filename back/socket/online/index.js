const jwt = require('jsonwebtoken');
const requestFriend = require('./requestFriend');
const disconnect = require('./disconnect');
const jwtOptions = require('../../config/jwtOptions');
const User = require('../User');
const parseCookies = require('../../util/cookie/parseCookies');

const userList = [];

function setOnlineSockets(socket) {
  this.userList = userList;
  this.socket = socket;
  const { jwt: jwtToken } = parseCookies(socket.handshake.headers.cookie);
  try {
    const { id, nickname } = jwt.verify(jwtToken, process.env.JWT_SECRET, {
      issuer: jwtOptions.issuer,
      subject: jwtOptions.subject,
    });
    this.userList.push(new User(nickname, socket, id));
  } catch (e) {
    socket.disconnect();
  }

  socket.on('requestFriend', requestFriend.bind(this));
  socket.on('disconnect', disconnect.bind(this));
}

module.exports = { setOnlineSockets };
