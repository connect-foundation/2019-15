const uuid = require('uuid/v1');
const { maxPeopleNum } = require('../config/roomConfig');

const makeRoomId = () => {
  return uuid();
};

class Room {
  constructor() {
    this.players = [];
    this.wordSet = null;
    this.word = null;
    this.timer = null;
    this.state = null;
    this.currentExaminer = null;
    this.totalRound = null;
    this.currentRound = null;
  }
}

const RoomManager = {
  roomList: ['3명', '6명', '12명', '100명', '비밀방'],
  room: { '3명': {}, '6명': {}, '12명': {}, '100명': {}, 비밀방: {} },
  maxPeopleNum,

  // 방이 없을 때 새로운 방을 만들고 반환.
  addRoom: function(roomName) {
    const newRoom = new Room();
    const roomId = makeRoomId();
    this.room[roomName][roomId] = newRoom;
    return roomId;
  },

  // 수용가능한 방을 하나 반환, 없으면 생성해서 반환
  getEnableRoomId: function(roomName) {
    const nRooms = this.room[roomName];

    // find의 반환값이 undefined일 수 있으므로, destructuring은 불가능
    // room[0] : key, room[1] : room
    let room = Object.entries(nRooms).find(
      ([roomId, _room]) => _room.players.length < maxPeopleNum[roomName],
    );

    if (!room) {
      room = [];
      room.push(this.addRoom(roomName));
    }
    return room[0];
  },

  // roomId로 room 객체를 찾은 후 반환
  getRoomByRoomId(roomName, roomId) {
    return this.room[roomName][roomId];
  },
};

module.exports = { RoomManager, Room };
