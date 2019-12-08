function acceptFriendRequest(nodeCache, socketUser, friend) {
  const friendSocket = nodeCache.get(friend.id);

  if (friendSocket) {
    socketUser.emitToMySockets('friendsOnline', { [friendSocket.id]: friendSocket.user });

    friendSocket.emitToMySockets('friendsOnline', { [socketUser.id]: socketUser.user });
  }
}

module.exports = acceptFriendRequest;
