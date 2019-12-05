function requestFriend(nodeCache, sender, { receiver }) {
  const userToReceive = nodeCache.get(receiver.id);
  if (!userToReceive) return;

  this.onlineIo.to(`${userToReceive.socketId}`).emit('requestFriend', sender);
}

module.exports = requestFriend;
