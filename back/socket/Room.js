const uuid = require('uuid/v1');

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

const maxPeopleNum = {
  '3명': 3,
  '6명': 6,
  '12명': 12,
  '100명': 100,
  비밀방: 100,
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
    let roomId;

    function findEnableRoomId(key) {
      if (nRooms[key].players.length < maxPeopleNum[roomName]) {
        roomId = key;
        return true;
      }
      return false;
    }

    Object.keys(nRooms).some(findEnableRoomId);

    if (roomId) {
      return roomId;
    }
    roomId = this.addRoom(roomName);
    return roomId;
  },
};

module.exports = { RoomManager, makeNewRoom };
