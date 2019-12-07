function checkFriendOnline(nodeCache, socketUser, friend) {
  const friendSocket = nodeCache.get(friend.id);

  if (friendSocket && friendSocket.socketList.length) {
    socketUser.socketList.forEach(({ id }) => {
      this.onlineIo.to(id).emit('friendsOnline', { [friendSocket.id]: friendSocket.user });
    });

    friendSocket.socketList.forEach(({ id }) => {
      this.onlineIo.to(id).emit('friendsOnline', { [socketUser.id]: socketUser.user });
    });
  }
}

module.exports = checkFriendOnline;
