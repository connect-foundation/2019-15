function disconnect(nodeCache, user) {
  nodeCache.del(user.id);
}

module.exports = disconnect;
