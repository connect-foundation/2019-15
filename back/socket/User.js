class User {
  constructor(nickname, socketId, id) {
    this.nickname = nickname;
    this.privileged = false;
    this.socketId = socketId;
    this.id = id;
    this.score = 0;
  }
}

module.exports = User;
