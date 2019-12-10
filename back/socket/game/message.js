const getScore = require('../../util/getScore');

function sendMessage(gameSocket, { roomType, roomId, inputValue }) {
  let answer;
  try {
    answer = this.RoomManager.room[roomType][roomId].word;
  } catch {
    answer = null;
  }

  const room = this.RoomManager.room[roomType][roomId];
  const idx = room.getUserIndexBySocketId(gameSocket);
  if (idx < 0) return;

  const player = room.players[idx];

  const returnMessage = {
    content: `${player.nickname} : ${inputValue}`,
    privileged: player.privileged,
  };

  if (inputValue === answer && !player.privileged) {
    room.answererCount += 1;
    player.privileged = true;
    returnMessage.content = `${player.nickname}님이 정답을 맞췄습니다! Hooray`;
    returnMessage.privileged = 'notice';

    // 점수 계산
    const defaultScore = 100;
    const score = getScore(
      room.timer.getRemainTime(),
      room.timer.getDefaultExpireTime(),
      defaultScore,
    );
    player.score += score;

    // 모든 플레이어가 답을 맞춘 경우
    if (room.isAllPlayerAnswered()) {
      room.questionEndCallback(this.gameIo);

      return;
    }
  }

  this.gameIo.in(roomId).emit('getMessage', returnMessage);
}

module.exports = { sendMessage };
