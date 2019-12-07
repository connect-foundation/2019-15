function requestFriend(nodeCache, socketUser, { receiver }) {
  const userToReceive = nodeCache.get(receiver.id);
  if (!userToReceive) return;

  userToReceive.socketList.forEach(({ id }) => {
    this.onlineIo.to(id).emit('requestFriend', { id: socketUser.user });
  });
}

module.exports = requestFriend;
