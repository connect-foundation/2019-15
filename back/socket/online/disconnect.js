function disconnect() {
  this.userList.splice(this.userList.findIndex((user) => user.socket === this.socket));
}

module.exports = disconnect;
