class User {
  constructor(id, nickname, socketId) {
    this.nickname = nickname;
    this.socketIdList = socketId ? [socketId] : [];
    this.id = id;
  }

  pushSocketId(socketId) {
    this.socketIdList.push(socketId);
  }
}

module.exports = User;
