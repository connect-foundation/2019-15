const NodeCache = require('node-cache');
const jwt = require('jsonwebtoken');
const alarm = require('./alarm');
const disconnect = require('./disconnect');
const jwtOptions = require('../../config/jwtOptions');
const SocketUser = require('./SocketUser');
const parseCookies = require('../../util/cookie/parseCookies');
const acceptFriendRequest = require('./acceptFriendRequest');
const deleteFriend = require('./deleteFriend');
const checkFriendsOnline = require('./checkFriendsOnline');
const { Friends } = require('../../db/models');

const nodeCache = new NodeCache({ useClones: false });

function getOrCreateSocketUser(id, nickname, socket, io) {
  let socketUser = nodeCache.get(id);
  if (!socketUser) {
    socketUser = new SocketUser(id, nickname, io);
    nodeCache.set(id, socketUser);
  }

  socketUser.pushSocket(socket);
  return socketUser;
}

async function emitOnlineToFriends(socketUser) {
  const FriendsFound = await Friends.findAll({
    where: {
      pFriendId: socketUser.id,
    },
  });

  FriendsFound.forEach(({ dataValues }) => {
    const friendSocket = dataValues.sFriendId ? nodeCache.get(dataValues.sFriendId) : null;
    if (friendSocket) {
      friendSocket.emitToMySockets('checkFriendsOnline', { [socketUser.id]: socketUser.user });
    }
  });
}

async function setOnlineSockets(socket) {
  let socketUser;
  try {
    const { jwt: jwtToken } = parseCookies(socket.handshake.headers.cookie);
    const { id, nickname } = jwt.verify(jwtToken, process.env.JWT_SECRET, {
      issuer: jwtOptions.issuer,
      subject: jwtOptions.subject,
    });

    socketUser = getOrCreateSocketUser(id, nickname, socket, this.onlineIo);
    await emitOnlineToFriends(socketUser);
  } catch (e) {
    console.log(e);
    socket.disconnect();
  }

  if (!socketUser) return;

  socket.on('checkFriendsOnline', checkFriendsOnline.bind(this, nodeCache, socketUser, socket));
  socket.on('deleteFriend', deleteFriend.bind(this, nodeCache, socketUser));
  socket.on('acceptFriendRequest', acceptFriendRequest.bind(this, nodeCache, socketUser));
  socket.on('alarm', alarm.bind(this, nodeCache, socketUser));
  socket.on('disconnect', disconnect.bind(this, nodeCache, socketUser, socket));
}

module.exports = setOnlineSockets;
