const { PRIVATE_ROOM_NAME } = require('../../config/roomConfig');
const { enterRandom, enterPrivate } = require('./enterGame');
const RoomManager = require('../../util/RoomManager');
const sendMessage = require('./message');
const startPrivateGame = require('./startPrivateGame');
const sendGameImage = require('./gameImage');
const selectWord = require('./selectWord');
const exitRoom = require('./exitRoom');
const changeRoomSetting = require('./changeRoomSetting');
const disconnect = require('./disconnect');

function setGameSocket(socket) {
  this.RoomManager = RoomManager;
  const roomInfo = {};
  const gameSocket = socket;

  socket.on('enterRandom', ({ nickname, roomType, avatar }) => {
    if (roomInfo.hasOwnProperty('stop')) {
      roomInfo.stop = true;
    } else {
      roomInfo.roomType = roomType;
      roomInfo.roomId = RoomManager.getEnableRoomId(roomType, this.gameIo);
      roomInfo.stop = false;
    }
  });

  socket.on('makePrivate', ({ roomId }) => {
    this.RoomManager.addRoom(PRIVATE_ROOM_NAME, roomId, this.gameIo);
    this.RoomManager.getRoom(roomId).roomOwner = gameSocket.id;
  });

  socket.on('enterPrivate', ({ nickname, roomId, avatar }) => {
    if (roomInfo.hasOwnProperty('stop')) {
      roomInfo.stop = true;
    } else {
      roomInfo.roomType = PRIVATE_ROOM_NAME;
      roomInfo.roomId = roomId;
      roomInfo.stop = false;
    }
  });

  socket.on('exitRoom', () => {
    delete roomInfo.stop;
  });
  socket.on('changeRoomSetting', changeRoomSetting.bind(this, gameSocket, roomInfo));
  socket.on('exitRoom', exitRoom.bind(this, gameSocket, roomInfo));
  socket.on('startPrivateGame', startPrivateGame.bind(this, gameSocket, roomInfo));
  socket.on('enterPrivate', enterPrivate.bind(this, gameSocket, roomInfo));
  socket.on('selectWord', selectWord.bind(this, gameSocket, roomInfo));
  socket.on('sendMessage', sendMessage.bind(this, gameSocket, roomInfo));
  socket.on('enterRandom', enterRandom.bind(this, gameSocket, roomInfo));
  socket.on('drawing', sendGameImage.bind(this, gameSocket, roomInfo));
  socket.on('disconnect', () => disconnect(gameSocket, RoomManager, roomInfo));
}

module.exports = setGameSocket;
