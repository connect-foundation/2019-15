class User {
  constructor(id, nickname, socketId) {
    this.nickname = nickname;
    this.socketId = socketId;
    this.id = id;
  }
}

module.exports = User;
