class User {
  constructor(nickname, socket, id, roomOwner = false) {
    this.nickname = nickname;
    this.privileged = false;
    this.socket = socket;
    this.id = id;
    this.score = 0;
    this.roomOwner = roomOwner;
  }
}

module.exports = User;
