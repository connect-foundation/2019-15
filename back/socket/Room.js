const uuid = require('uuid/v1');

const makeRoomId = () => {
  return uuid();
};

const makeNewRoom = (roomId) => {
  /*
  roomId: number,
  people: ,
  wordSet: number(categoryId),
  word: string,
  time:
  state: number?,
  currentExaminer: number(people index),
  totalRound: number,
  currentRound: number
   */
  return {
    roomId,
    people: [],
    wordSet: undefined,
    word: undefined,
    time: undefined,
    state: 0,
    currentExaminer: 0,
    totalRound: 0,
    currentRound: 0,
  };
};

const publicRoom = {
  roomList: ['3명', '6명', '12명', '100명'],
  room: { '3명': [], '6명': [], '12명': [], '100명': [] },
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
    const idx = nRooms.findIndex((v) => v.people.length < parseInt(capacity.replace('명', ''), 0));

    if (idx < 0) {
      return this.addRoom(capacity);
    }
    return nRooms[idx];
  },
};

module.exports = publicRoom;
