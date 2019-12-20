function changeRoomSetting(gameSocket, roomInfo, { selectType, selectedIndex }) {
  gameSocket.to(roomInfo.roomId).emit('changeRoomSetting', { selectType, selectedIndex });
}

module.exports = changeRoomSetting;
