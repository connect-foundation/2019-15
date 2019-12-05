const NodeCache = require('node-cache');
const jwt = require('jsonwebtoken');
const requestFriend = require('./requestFriend');
const disconnect = require('./disconnect');
const jwtOptions = require('../../config/jwtOptions');
const User = require('./User');
const parseCookies = require('../../util/cookie/parseCookies');
const { Friends } = require('../../db/models');
const checkFriendOnline = require('./checkFriendOnline');

const nodeCache = new NodeCache({ useClones: true });

async function emitOnline(socket, user) {
  const FriendsFound = await Friends.findAll({
    where: {
      pFriendId: user.id,
    },
  });
  const onlineFriends = FriendsFound.reduce((acc, { dataValues }) => {
    const friend = nodeCache.get(dataValues.sFriendId);
    if (!friend || !friend.socketIdList.length) {
      return acc;
    }
    friend.socketIdList.forEach((socketId) => {
      this.onlineIo.to(`${socketId}`).emit('friendsOnline', { [user.id]: user });
    });
    acc[friend.id] = friend;
    return acc;
  }, {});

  this.onlineIo.to(socket.id).emit('friendsOnline', onlineFriends);
}

function getOrCreateUser(id, nickname, socket) {
  let user = nodeCache.get(id);
  if (user) {
    user.pushSocketId(socket.id);
  } else {
    user = new User(id, nickname, socket.id);
    nodeCache.set(id, user);
  }
  return user;
}

async function setOnlineSockets(socket) {
  let user;
  try {
    const { jwt: jwtToken } = parseCookies(socket.handshake.headers.cookie);
    const { id, nickname } = jwt.verify(jwtToken, process.env.JWT_SECRET, {
      issuer: jwtOptions.issuer,
      subject: jwtOptions.subject,
    });

    user = getOrCreateUser(id, nickname, socket);
    await emitOnline(socket, user);
  } catch (e) {
    console.log(e);
    socket.disconnect();
  }

  if (!user) return;

  socket.on('requestFriend', requestFriend.bind(this, nodeCache, user));
  socket.on('disconnect', disconnect.bind(this, nodeCache, user, socket));
}

module.exports = setOnlineSockets;
