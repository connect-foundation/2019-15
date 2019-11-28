function requestFriend({ sender, receiver }) {
  this.userList.forEach((user) => {
    if (user.nickname !== receiver.nickname) {
      return;
    }
    this.onlineIo.to(`${user.socket.id}`).emit('requestFriend', sender);
  });
}

module.exports = requestFriend;
