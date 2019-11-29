function requestFriend({ sender, receiver }) {
  this.userList
    .filter((user) => user.nickname === receiver.nickname)
    .forEach((user) => {
      this.onlineIo.to(`${user.socket.id}`).emit('requestFriend', sender);
    });
}

module.exports = requestFriend;
