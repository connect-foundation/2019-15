const uuid = require('uuid/v1');
const NodeCache = require('node-cache');
const { maxPeopleNum } = require('../config/roomConfig');
const Room = require('./room/Room');

const makeRoomId = () => uuid();

const RoomManager = {
  room: new NodeCache({ useClones: false }),
  maxPeopleNum,

  // 방이 없을 때 새로운 방을 만들고 반환.
  addRoom(roomType, roomId, gameIo) {
    this.room.set(roomId, new Room(gameIo, roomId, roomType));
    return roomId;
  },

  deleteRoom(roomId) {
    this.room.del(roomId);
  },

  // 수용가능한 방을 하나 반환, 없으면 생성해서 반환
  getEnableRoomId(roomType, gameIo) {
    const roomIdList = this.room.keys();

    const roomIdIndex = roomIdList.findIndex((roomId) => {
      const room = this.room.get(roomId);
      if (room.roomType === roomType && room.players.length < maxPeopleNum[roomType]) return true;
      return false;
    });

    if (roomIdIndex < 0) {
      const roomId = makeRoomId();
      this.addRoom(roomType, roomId, gameIo);
      return roomId;
    }
    return roomIdList[roomIdIndex];
  },

  isExistRoom(roomId) {
    return this.room.has(roomId);
  },

  getRoom(roomId) {
    if (this.isExistRoom(roomId)) return this.room.get(roomId);
    return false;
  },

  getRoomIfExist(roomInfo) {
    if (!roomInfo) return false;
    return this.getRoom(roomInfo.roomId);
  },
};

module.exports = RoomManager;
