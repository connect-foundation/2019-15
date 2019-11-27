const uuid = require('uuid/v1');
const { maxPeopleNum } = require('../config/roomConfig');

const makeRoomId = () => {
  return uuid();
};

const makeNewRoom = () => {
  return {
    players: [],
    wordSet: null,
    word: null,
    timer: null,
    state: null,
    currentExaminer: null,
    totalRound: null,
    currentRound: null,
  };
};

const RoomManager = {
  roomList: ['3명', '6명', '12명', '100명', '비밀방'],
  room: { '3명': {}, '6명': {}, '12명': {}, '100명': {}, 비밀방: {} },
  maxPeopleNum,

  // 방이 없을 때 새로운 방을 만들고 반환.
  addRoom: function(roomName) {
    const newRoom = makeNewRoom();
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
};

module.exports = { RoomManager, makeNewRoom };
