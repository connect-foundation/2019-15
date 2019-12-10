const getRandomInt = require('../../util/getRandomInt');
const { roomState } = require('../../config/roomConfig');

function selectWord(gameSocket, { answer, roomType, roomId }) {
  const room = this.RoomManager.room[roomType][roomId];
  room.state = roomState.PLAYING_QUESTION;
  room.word = answer;
  room.timer.start();
  const openIndex = getRandomInt(0, answer.length);

  this.gameIo.in(roomId).emit('startQuestion', {
    wordLength: answer.length,
    openLetter: answer[openIndex],
    openIndex,
    endTime: room.timer.endTime,
  });
}
module.exports = selectWord;
