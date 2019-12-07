class SocketUser {
  constructor(id, nickname) {
    this.nickname = nickname;
    this.socketList = [];
    this.id = id;
  }

  pushSocket(socket) {
    this.socketList.push(socket);
  }

  get user() {
    return {
      id: this.id,
      nickname: this.nickname,
    };
  }
}

module.exports = SocketUser;
