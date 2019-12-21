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

  makeUserData(nickname) {
    return {
      nickname,
      socketId: this.socket.id,
      privileged: this.privileged,
      avatar: this.avatar,
      roomOwner: this.roomOwner,
    };
  }
}

module.exports = User;
