function deleteFriend(nodeCache, socketUser, receiver) {
  const friendSocket = nodeCache.get(receiver.id);
  friendSocket.emitToMySockets('friendOffline', socketUser.user);

  socketUser.emitToMySockets('friendOffline', friendSocket.user);
}

module.exports = deleteFriend;
