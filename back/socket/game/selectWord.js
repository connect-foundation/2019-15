const getRandomInt = require('../../util/getRandomInt');
const { roomState } = require('../../config/roomConfig');
const { DrawingHistories } = require('../../db/models');

async function saveDrawingHistories(playerId, word) {
  await DrawingHistories.create({
    userId: playerId,
    word: word,
  });
}

function selectWord(gameSocket, { answer, roomType, roomId }) {
  const room = this.RoomManager.room[roomType][roomId];
  if (!room) return;
  room.state = roomState.PLAYING_QUESTION;
  room.word = answer;
  room.timer.start();
  room.openIndex = getRandomInt(0, answer.length);

  this.gameIo.in(roomId).emit('startQuestion', room.makeStartQuestionData());

  const userIdx = room.getUserIndexBySocketId(gameSocket);
  if (userIdx < 0) return;
  const playerId = room.players[userIdx].id;
  saveDrawingHistories(playerId, answer);
}

module.exports = selectWord;
