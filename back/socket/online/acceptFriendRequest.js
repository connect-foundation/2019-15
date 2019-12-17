function acceptFriendRequest(nodeCache, socketUser, friend) {
  const friendSocket = nodeCache.get(friend.id);

  if (friendSocket) {
    socketUser.emitToMySockets('checkFriendsOnline', { [friendSocket.id]: friendSocket.user });

    friendSocket.emitToMySockets('checkFriendsOnline', { [socketUser.id]: socketUser.user });
  }
}

module.exports = acceptFriendRequest;
