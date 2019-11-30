class User {
  constructor(nickname, socket, id) {
    this.nickname = nickname;
    this.privileged = false;
    this.socket = socket;
    this.id = id;
  }
}

module.exports = User;
