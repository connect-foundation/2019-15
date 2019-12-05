const { Friends } = require('../../db/models');

async function disconnect(nodeCache, user, socket) {
  user.socketIdList.splice(user.socketIdList.indexOf(socket.id), 1);
  if (user.socketIdList.length) return;

  const FriendsFound = await Friends.findAll({
    where: {
      pFriendId: user.id,
    },
  });
  FriendsFound.forEach(({ dataValues }) => {
    const friend = nodeCache.get(dataValues.sFriendId);
    if (friend && friend.socketIdList.length) {
      friend.socketIdList.forEach((socketId) => {
        this.onlineIo.to(socketId).emit('friendOffline', user);
      });
    }
  });
}

module.exports = disconnect;
