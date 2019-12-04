class User {
  constructor(nickname, socket, id) {
    this.nickname = nickname;
    this.privileged = false;
    this.socket = socket;
    this.id = id;
    this.score = 0;
  }
}

module.exports = User;
