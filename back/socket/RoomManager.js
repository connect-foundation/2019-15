const uuid = require('uuid/v1');
const { maxPeopleNum, roomState } = require('../config/roomConfig');
const { Room } = require('./Room');

const makeRoomId = () => {
  return uuid();
};

const RoomManager = {
  roomList: ['3명', '6명', '12명', '100명', '비밀방'],
  room: { '3명': {}, '6명': {}, '12명': {}, '100명': {}, 비밀방: {} },
  maxPeopleNum,

  // 방이 없을 때 새로운 방을 만들고 반환.
  addRoom(roomType, roomId, gameIo) {
    this.room[roomType][roomId] = new Room(gameIo, roomId, roomType);
    return roomId;
  },

  deleteRoom(roomType, roomId) {
    delete this.room[roomType][roomId];
  },

  // 수용가능한 방을 하나 반환, 없으면 생성해서 반환
  getEnableRoomId(roomType, gameIo) {
    const nRooms = this.room[roomType];

    // find의 반환값이 undefined일 수 있으므로, destructuring은 불가능
    // room[0] : key, room[1] : room
    let room = Object.entries(nRooms).find(
      ([roomId, _room]) => _room.players.length < maxPeopleNum[roomType],
    );

    if (!room) {
      room = [];
      room.push(this.addRoom(roomType, makeRoomId(), gameIo));
    }
    return room[0];
  },

  isExistRoom({ roomType, roomId }) {
    return roomType && roomId && this.room[roomType].hasOwnProperty(roomId);
  },

  getRoom({ roomType, roomId }) {
    if (this.isExistRoom({ roomType, roomId })) {
      return this.room[roomType][roomId];
    }
    return null;
  },
};

module.exports = { RoomManager };
