class User {
  constructor(nickname, socket, id, roomOwner = false, avatar = 0) {
    this.nickname = nickname;
    this.privileged = false;
    this.socket = socket;
    this.id = id;
    this.score = 0;
    this.roomOwner = roomOwner;
    this.avatar = avatar;
  }
}

module.exports = User;
