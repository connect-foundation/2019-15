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
  addRoom(roomName, gameIo) {
    const newRoom = new Room(gameIo);
    let roomId = makeRoomId();

    if (privateRoomId) {
      roomId = privateRoomId;
    }

    newRoom.roomId = roomId;
    newRoom.state = roomState.EMPTY;
    this.room[roomName][roomId] = newRoom;

    return roomId;
  },

  deleteRoom(roomName, gameIo) {
    delete this.room[roomName][gameIo];
  },

  // 수용가능한 방을 하나 반환, 없으면 생성해서 반환
  getEnableRoomId(roomName, gameIo) {
    const nRooms = this.room[roomName];

    // find의 반환값이 undefined일 수 있으므로, destructuring은 불가능
    // room[0] : key, room[1] : room
    let room = Object.entries(nRooms).find(
      ([roomId, _room]) => _room.players.length < maxPeopleNum[roomName],
    );

    if (!room) {
      room = [];
      room.push(this.addRoom(roomName, gameIo));
    }
    return room[0];
  },

  getEnableSecretRoom(roomId) {
    const secretRoomList = this.room['비밀방'];

    if (!secretRoomList.hasOwnProperty(roomId)) secretRoomList[roomId] = new Room();

    return secretRoomList[roomId];
  },

  isExistRoom({ roomType, roomId }) {
    return roomType && roomId && this.room[roomType].hasOwnProperty(roomId);
  },

  getRoomByRoomId(roomName, roomId) {
    return this.room[roomName][roomId];
  },
};

module.exports = { RoomManager };
