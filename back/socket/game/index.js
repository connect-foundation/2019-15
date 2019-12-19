const { RoomManager } = require('../RoomManager');
const sendGameImage = require('./gameImage');
const { enterRandom, enterPrivate } = require('./enterGame');
const { sendMessage } = require('./message');
const selectWord = require('./selectWord');
const { PRIVATE_ROOM_NAME, escapeResultCode } = require('../../config/roomConfig');
const { startPrivateGame } = require('./startPrivateGame');
const exitRoom = require('./exitRoom');

function setGameSocket(socket) {
  this.RoomManager = RoomManager;
  const roomInfo = {};
  const gameSocket = socket;

  socket.on('enterRandom', ({ nickname, roomType, avatar }) => {
    roomInfo.roomType = roomType;
    roomInfo.roomId = RoomManager.getEnableRoomId(roomType, this.gameIo);
  });

  socket.on('makePrivate', ({ roomId }) => {
    this.RoomManager.addRoom(PRIVATE_ROOM_NAME, roomId, this.gameIo);
    this.RoomManager.room[PRIVATE_ROOM_NAME][roomId].roomOwner = gameSocket.id;
  });

  socket.on('enterPrivate', ({ nickname, roomId, avatar }) => {
    roomInfo.roomType = PRIVATE_ROOM_NAME;
    roomInfo.roomId = roomId;
  });

  socket.on('changeRoomSetting', ({ selectType, selectedIndex }) => {
    socket.to(roomInfo.roomId).emit('changeRoomSetting', { selectType, selectedIndex });
  });

  socket.on('exitRoom', exitRoom.bind(this, gameSocket, roomInfo));
  socket.on('startPrivateGame', startPrivateGame.bind(this, gameSocket, roomInfo));
  socket.on('enterPrivate', enterPrivate.bind(this, gameSocket, roomInfo));
  socket.on('selectWord', selectWord.bind(this, gameSocket, roomInfo));
  socket.on('sendMessage', sendMessage.bind(this, gameSocket, roomInfo));
  socket.on('enterRandom', enterRandom.bind(this, gameSocket, roomInfo));
  socket.on('drawing', sendGameImage.bind(this, gameSocket, roomInfo));
  socket.on('disconnect', () => {
    const room = RoomManager.getRoomIfExist(roomInfo);
    if (!room) return;

    const userIdx = room.getUserIndexBySocketId(gameSocket);
    if (userIdx < 0) return; // 방에서 유저 정보를 못 찾은경우 종료

    // 방에 유저가 2명 이하면 방 정보 초기화
    if (room.players.length <= 2) room.initRoomState();

    // 방에 있는 플레이어 업데이트
    room.removePlayer(userIdx);
    gameSocket.leave();

    const removeResult = room.getRoomStateAfterRemovePlayer(userIdx);
    room.roomSettingAfterUserRemove(removeResult, gameSocket);
    room.sendUserList(this.gameIo);

    if (roomInfo.roomType === PRIVATE_ROOM_NAME) {
      if (gameSocket.id === room.roomOwner) {
        room.passRoomOwnerToNext();
        room.sendUserList(this.gameIo);
      }

      if (room.players.length < 1) {
        room.timer.stop();
      }
    } else if (room.players.length < 1) {
      room.timer.stop();
      RoomManager.deleteRoom(roomInfo.roomId);
    }
  });
}

module.exports = setGameSocket;
