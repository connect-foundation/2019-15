const { personEnterPrivateRoom, sendUserListToRoom } = require('./game');
const { RoomManager } = require('../RoomManager');
const exitRoom = require('./exitRoom');
const sendGameImage = require('./gameImage');
const { enterRandom, enterPrivate } = require('./enterGame');
const { sendMessage } = require('./message');
const selectWord = require('./selectWord');
const { PRIVATE_ROOM_NAME } = require('../../config/roomConfig');
const { Room } = require('../Room');
const { startPrivateGame } = require('./startPrivateGame');

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
  });

  socket.on('enterPrivate', ({ nickname, roomId, roomOwner, avatar }) => {
    roomInfo.roomType = PRIVATE_ROOM_NAME;
    roomInfo.roomId = roomId;
  });

  socket.on('startPrivateGame', startPrivateGame.bind(this, gameSocket));
  socket.on('enterPrivate', enterPrivate.bind(this, gameSocket));
  socket.on('selectWord', selectWord.bind(this, gameSocket));
  socket.on('sendMessage', sendMessage.bind(this, gameSocket));
  socket.on('enterRandom', enterRandom.bind(this, gameSocket, roomInfo));
  socket.on('drawing', sendGameImage.bind(this, gameSocket));
  socket.on('exitRoom', exitRoom.bind(this, gameSocket));
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
  });
}

module.exports = setGameSocket;
