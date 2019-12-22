function alarm(nodeCache, socketUser, { user, message }) {
  const friendSocket = nodeCache.get(user.id);
  if (friendSocket) friendSocket.emitToMySockets('alarm', message);
}

module.exports = alarm;
