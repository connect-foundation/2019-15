const getRandomInt = require('../../util/getRandomInt');

function selectWord(gameSocket, { answer, roomType, roomId }) {
  const room = this.RoomManager.room[roomType][roomId];
  room.word = answer;
  // 서버 타이머 트리거
  room.timer.start();
  // 클라들에게 뿌려주기
  const openIndex = getRandomInt(0, answer.length);
  this.gameIo.in(roomId).emit('startQuestion', {
    wordLength: answer.length,
    openLetter: answer[openIndex],
    openIndex,
  });
}
module.exports = selectWord;
