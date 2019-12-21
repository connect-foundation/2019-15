const { PRIVATE_ROOM_NAME } = require('../../config/roomConfig');

function disconnect(gameSocket, RoomManager, roomInfo) {
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
}

module.exports = disconnect;
