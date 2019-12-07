const { Friends } = require('../../db/models');

async function disconnect(nodeCache, socketUser, socket) {
  socketUser.socketList.splice(socketUser.socketList.indexOf(socket), 1);
  if (socketUser.socketList.length) return;

  const FriendsFound = await Friends.findAll({
    where: {
      pFriendId: socketUser.id,
    },
  });
  FriendsFound.forEach(({ dataValues }) => {
    const friend = nodeCache.get(dataValues.sFriendId);
    if (friend && friend.socketList.length) {
      friend.socketList.forEach(({ id }) => {
        this.onlineIo.to(id).emit('friendOffline', socketUser.user);
      });
    }
  });
}

module.exports = disconnect;
