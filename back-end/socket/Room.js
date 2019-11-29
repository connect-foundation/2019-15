class Room {
  constructor() {
    this.players = [];
    this.word = null;
  }
}

const RoomManager = {
  room: { '3명': {}, '6명': {}, '12명': {}, '100명': {}, 비밀방: {} },
};

module.exports = { RoomManager, Room };
