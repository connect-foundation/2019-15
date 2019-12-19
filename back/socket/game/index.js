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
    this.RoomManager.addRoom(PRIVATE_ROOM_NAME, this.gameIo, roomId);
    this.RoomManager.room[PRIVATE_ROOM_NAME][roomId].roomOwner = gameSocket.id;
  });

  socket.on('enterPrivate', ({ nickname, roomId, avatar }) => {
    roomInfo.roomType = PRIVATE_ROOM_NAME;
    roomInfo.roomId = roomId;
  });

  socket.on('changeRoomSetting', ({ selectType, selectedIndex }) => {
    socket.to(roomInfo.roomId).emit('changeRoomSetting', { selectType, selectedIndex });
  });

  socket.on('exitRoom', exitRoom.bind(this, gameSocket));
  socket.on('startPrivateGame', startPrivateGame.bind(this, gameSocket));
  socket.on('enterPrivate', enterPrivate.bind(this, gameSocket, roomInfo));
  socket.on('selectWord', selectWord.bind(this, gameSocket));
  socket.on('sendMessage', sendMessage.bind(this, gameSocket));
  socket.on('enterRandom', enterRandom.bind(this, gameSocket, roomInfo));
  socket.on('drawing', sendGameImage.bind(this, gameSocket));
  socket.on('disconnect', () => {
    if (!roomInfo) return; // 방정보가 없는 경우 게임중이 아니었으므로 종료

    if (!RoomManager.isExistRoom(roomInfo)) return; // 방정보가 있으나 이미 삭제된 방일 경우 종료

    const { roomType, roomId } = roomInfo;
    const room = RoomManager.getRoom(roomInfo);
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

    if (roomType === PRIVATE_ROOM_NAME) {
      if (gameSocket.id === room.roomOwner) {
        room.passRoomOwnerToNext();
        room.sendUserList(this.gameIo);
      }

      if (room.players.length < 1) {
        room.timer.stop();
      }
    } else if (room.players.length < 1) {
      RoomManager.deleteRoom(roomType, roomId);
    }
  });
}

module.exports = setGameSocket;
