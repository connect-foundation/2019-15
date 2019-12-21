const getScore = require('../../util/getScore');

function sendMessage(gameSocket, roomInfo, { inputValue: userInput }) {
  const room = this.RoomManager.getRoomIfExist(roomInfo);
  if (!room) return;

  const { roomId } = roomInfo;

  const userIdx = room.getUserIndexBySocketId(gameSocket);
  if (userIdx < 0) return;

  const player = room.players[userIdx];
  const answer = room.word;

  const returnMessage = {
    content: `${player.nickname} : ${userInput}`,
    privileged: player.privileged,
  };

  if (userInput === answer && !player.privileged) {
    room.answererCount += 1;
    player.privileged = true;
    returnMessage.content = `${player.nickname}님이 정답을 맞췄습니다! Hooray`;
    returnMessage.privileged = 'notice';

    this.gameIo.in(roomId).emit('getMessage', returnMessage);
    room.sendUserList(this.gameIo);

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
    }
    return;
  }

  this.gameIo.in(roomId).emit('getMessage', returnMessage);
}

module.exports = sendMessage;
