const { personEnterPrivateRoom, sendUserListToRoom } = require('./game');
const { RoomManager } = require('../RoomManager');
const sendGameImage = require('./gameImage');
const enterRandom = require('./enterRandom');
const { sendMessage } = require('./message');
const selectWord = require('./selectWord');
const { PRIVATE_ROOM_NAME } = require('../../config/roomConfig');
const { Room } = require('../Room');

function setGameSocket(socket) {
  this.RoomManager = RoomManager;
  const roomInfo = {};
  const gameSocket = socket;

  socket.on('enterRandom', ({ nickname, roomType }) => {
    roomInfo.roomType = roomType;
    roomInfo.roomId = RoomManager.getEnableRoomId(roomType, this.gameIo);
  });

  socket.on('makePrivate', ({ roomId }) => {
    this.RoomManager.room[PRIVATE_ROOM_NAME][roomId] = new Room(this.gameIo);
    roomInfo.roomId = roomId;
    roomInfo.roomType = PRIVATE_ROOM_NAME;
  });

  socket.on('startPrivateGame', ({ roomId, roomType }) => {
    // 난입 시나리오 추가해야됨
    const room = RoomManager.room[roomType][roomId];
    if (room.isPlayable()) {
      this.gameIo
        .to(roomId)
        .emit('startPrivateGame', { painter: room.players[room.players.length - 1].socket.id });
    }
  });

  socket.on('selectWord', selectWord.bind(this, gameSocket));
  socket.on('sendMessage', sendMessage.bind(this, gameSocket));
  socket.on('enterRandom', enterRandom.bind(this, gameSocket, roomInfo));
  socket.on('drawing', sendGameImage.bind(this, gameSocket));
  socket.on('disconnect', () => {
    if (!roomInfo) return;
    if (!RoomManager.isExistRoom(roomInfo)) return;

    const { roomType, roomId } = roomInfo;
    const room = RoomManager.room[roomType][roomId];
    const userIdx = room.getUserIndexBySocketId(gameSocket);
    if (userIdx >= 0) {
      room.removePlayer(userIdx);
      sendUserListToRoom(room.players, roomId, this.gameIo);
      gameSocket.leave();
    }
    if (room.players.length < 1) {
      RoomManager.deleteRoom(roomType, roomId);
    }
  });
}

module.exports = setGameSocket;
