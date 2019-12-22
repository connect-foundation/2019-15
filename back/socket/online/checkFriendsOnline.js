async function checkFriendsOnline(nodeCache, socketUser, socket, friends) {
  const onlineFriends = friends.reduce((acc, friend) => {
    const friendSocket = nodeCache.get(friend.id);
    if (friendSocket && friendSocket.isOnline()) {
      acc[friend.id] = friend;
    }
    return acc;
  }, {});
  this.onlineIo.to(socket.id).emit('checkFriendsOnline', onlineFriends);
}

module.exports = checkFriendsOnline;
