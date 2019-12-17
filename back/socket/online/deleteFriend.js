function deleteFriend(nodeCache, socketUser, receiver) {
  console.log(receiver);
  const friendSocket = nodeCache.get(receiver.id);
  friendSocket.emitToMySockets('offlineFriend', socketUser.user);

  socketUser.emitToMySockets('offlineFriend', friendSocket.user);
}

module.exports = deleteFriend;
