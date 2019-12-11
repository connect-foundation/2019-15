const getRandomInt = require('../../util/getRandomInt');
const { roomState } = require('../../config/roomConfig');

function selectWord(gameSocket, { answer, roomType, roomId }) {
  const room = this.RoomManager.room[roomType][roomId];
  if (!room) return;
  room.state = roomState.PLAYING_QUESTION;
  room.word = answer;
  room.timer.start();
  room.openIndex = getRandomInt(0, answer.length);

  this.gameIo.in(roomId).emit('startQuestion', room.makeStartQuestionData());
}
module.exports = selectWord;
