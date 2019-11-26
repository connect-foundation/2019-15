const uuid = require('uuid/v1');

const makeRoomId = () => {
  return uuid();
};

const makeNewRoom = (roomId) => {
  return { roomId, people: [] };
};

const maxPeopleNum = {
  '3명': 3,
  '6명': 6,
  '12명': 12,
  '100명': 100,
  비밀방: 100,
};

const Room = {
  roomList: ['3명', '6명', '12명', '100명', '비밀방'],
  room: { '3명': [], '6명': [], '12명': [], '100명': [], 비밀방: [] },
  maxPeopleNum,
  // 방이 없을 때 새로운 방을 만들고 반환.
  addRoom: function(capacity) {
    const newRoom = makeNewRoom(makeRoomId());
    this.room[capacity].push(newRoom);
    return newRoom;
  },
  // 수용가능한 방을 하나 반환, 없으면 생성해서 반환
  getEnableRoom: function(capacity) {
    const nRooms = this.room[capacity];

    // warn: 병목 예상
    const idx = nRooms.findIndex((v) => v.people.length < maxPeopleNum[capacity]);

    if (idx < 0) {
      return this.addRoom(capacity);
    }
    return nRooms[idx];
  },
};

module.exports = { Room, makeNewRoom };
