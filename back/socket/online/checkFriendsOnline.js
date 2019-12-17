async function checkFriendsOnline(nodeCache, socketUser, socket, friends) {
  const onlineFriends = friends.reduce((acc, friend) => {
    if (nodeCache.get(friend.id)) acc[friend.id] = friend;
    return acc;
  }, {});
  this.onlineIo.to(socket.id).emit('checkFriendsOnline', onlineFriends);
}

module.exports = checkFriendsOnline;
