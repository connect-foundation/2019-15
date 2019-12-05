function requestFriend(nodeCache, sender, { receiver }) {
  const userToReceive = nodeCache.get(receiver.id);
  if (!userToReceive) return;

  userToReceive.socketIdList.forEach((socketId) => {
    this.onlineIo.to(socketId).emit('requestFriend', sender);
  });
}

module.exports = requestFriend;
