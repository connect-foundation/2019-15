const NodeCache = require('node-cache');
const jwt = require('jsonwebtoken');
const requestFriend = require('./requestFriend');
const disconnect = require('./disconnect');
const jwtOptions = require('../../config/jwtOptions');
const User = require('./User');
const parseCookies = require('../../util/cookie/parseCookies');

const nodeCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });
function setOnlineSockets(socket) {
  const { jwt: jwtToken } = parseCookies(socket.handshake.headers.cookie);
  let user;
  try {
    const { id, nickname } = jwt.verify(jwtToken, process.env.JWT_SECRET, {
      issuer: jwtOptions.issuer,
      subject: jwtOptions.subject,
    });
    user = new User(id, nickname, socket.id);
    nodeCache.set(id, user);
  } catch (e) {
    console.log(e);
    socket.disconnect();
  }

  socket.on('requestFriend', requestFriend.bind(this, nodeCache, user));
  socket.on('disconnect', disconnect.bind(this, nodeCache, user));
}

module.exports = setOnlineSockets;
