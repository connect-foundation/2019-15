const models = require('../../db/models');

const getRandomInt = require('../../util/common/getRandomInt');
const { roomState } = require('../../config/roomConfig');
const { DrawingHistories } = require('../../db/models');

async function saveDrawingHistories(playerId, word) {
  let transaction;

  try {
    transaction = await models.sequelize.transaction();

    await DrawingHistories.bulkCreate([
      {
        userId: playerId,
        word: word,
      },
    ]);
    await transaction.commit();
  } catch (e) {
    if (transaction) await transaction.rollback();
    throw new Error(e);
  }
}

function selectWord(gameSocket, roomInfo, { answer }) {
  const room = this.RoomManager.getRoomIfExist(roomInfo);
  if (!room) return;

  const { roomId } = roomInfo;

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
