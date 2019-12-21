class SocketUser {
  constructor(id, nickname, io) {
    this.nickname = nickname;
    this.socketList = [];
    this.id = id;
    this.io = io;
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

  emitToMySockets(eventName, data) {
    if (!this.io) return;
    this.socketList.forEach(({ id }) => {
      this.io.to(id).emit(eventName, data);
    });
  }

  isOnline() {
    return !!this.socketList.length;
  }
}

module.exports = SocketUser;
