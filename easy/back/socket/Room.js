// 게임 방을 다루는 객체를 하나 만들었습니다.

const uuid = require("uuid/v1");

const makeRoomId = () => {
  return uuid();
};

const publicRoom = {
  room: { 3: [], 6: [], 12: [], 100: [] },
  // 방이 없을 때 새로운 방을 만들고 반환.
  makeRoom: capacity => {
    const newRoom = { roomid: makeRoomId(), people: 0 };
    this.room[capacity].push(newRoom);
    return newRoom;
  },
  // 수용가능한 방을 하나 반환, 없으면 생성해서 반환
  getEnableRoom: capacity => {
    const nRooms = this.room[capacity];

    const idx = nRooms.findIndex(v => v.people < capacity);

    if (nRooms.length === 0) {
      return this.makeRoom(capacity);
    }

    return nRooms[idx];
  }
};

module.exports = publicRoom;
