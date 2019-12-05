const NodeCache = require('node-cache');
const jwt = require('jsonwebtoken');
const requestFriend = require('./requestFriend');
const disconnect = require('./disconnect');
const jwtOptions = require('../../config/jwtOptions');
const User = require('./User');
const parseCookies = require('../../util/cookie/parseCookies');
const { Friends } = require('../../db/models');

const nodeCache = new NodeCache();

async function emitOnline(socket, user) {
  const FriendsFound = await Friends.findAll({
    where: {
      pFriendId: user.id,
    },
  });
  const onlineFriends = FriendsFound.reduce((acc, { dataValues }) => {
    const friend = nodeCache.get(dataValues.sFriendId);
    if (friend) {
      this.onlineIo.to(`${friend.socketId}`).emit('friendsOnline', [user]);
      acc.push(friend);
    }
    return acc;
  }, []);

  this.onlineIo.to(`${socket.id}`).emit('friendsOnline', onlineFriends);
}

async function setOnlineSockets(socket) {
  let user;

  try {
    const { jwt: jwtToken } = parseCookies(socket.handshake.headers.cookie);
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

  if (!user) return;
  await emitOnline(socket, user);

  socket.on('requestFriend', requestFriend.bind(this, nodeCache, user));
  socket.on('disconnect', disconnect.bind(this, nodeCache, user));
}

module.exports = setOnlineSockets;
