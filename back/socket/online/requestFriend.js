function requestFriend(nodeCache, socketUser, receiver) {
  const friendSocket = nodeCache.get(receiver.id);
  if (friendSocket) friendSocket.emitToMySockets('requestFriend', socketUser.user);
}

module.exports = requestFriend;
