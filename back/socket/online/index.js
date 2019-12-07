const NodeCache = require('node-cache');
const jwt = require('jsonwebtoken');
const requestFriend = require('./requestFriend');
const disconnect = require('./disconnect');
const jwtOptions = require('../../config/jwtOptions');
const SocketUser = require('./SocketUser');
const parseCookies = require('../../util/cookie/parseCookies');
const { Friends } = require('../../db/models');
const checkFriendOnline = require('./checkFriendOnline');

const nodeCache = new NodeCache({ useClones: false });

async function emitOnline(socket, socketUser) {
  const FriendsFound = await Friends.findAll({
    where: {
      pFriendId: socketUser.id,
    },
  });
  const onlineFriends = FriendsFound.reduce((acc, { dataValues }) => {
    const friendSocket = nodeCache.get(dataValues.sFriendId);
    if (!friendSocket || !friendSocket.socketList.length) {
      return acc;
    }
    friendSocket.socketList.forEach(({ id }) => {
      this.onlineIo.to(id).emit('friendsOnline', { [socketUser.id]: socketUser.user });
    });
    acc[friendSocket.id] = friendSocket.user;
    return acc;
  }, {});

  this.onlineIo.to(socket.id).emit('friendsOnline', onlineFriends);
}

function getOrCreateSocketUser(id, nickname, socket) {
  let socketUser = nodeCache.get(id);
  if (!socketUser) {
    socketUser = new SocketUser(id, nickname);
    nodeCache.set(id, socketUser);
  }

  socketUser.pushSocket(socket);
  return socketUser;
}

async function setOnlineSockets(socket) {
  let socketUser;
  try {
    const { jwt: jwtToken } = parseCookies(socket.handshake.headers.cookie);
    const { id, nickname } = jwt.verify(jwtToken, process.env.JWT_SECRET, {
      issuer: jwtOptions.issuer,
      subject: jwtOptions.subject,
    });

    socketUser = getOrCreateSocketUser(id, nickname, socket);
    await emitOnline(socket, socketUser);
  } catch (e) {
    console.log(e);
    socket.disconnect();
  }

  if (!socketUser) return;

  socket.on('checkFriendOnline', checkFriendOnline.bind(this, nodeCache, socketUser));
  socket.on('requestFriend', requestFriend.bind(this, nodeCache, socketUser));
  socket.on('disconnect', disconnect.bind(this, nodeCache, socketUser, socket));
}

module.exports = setOnlineSockets;