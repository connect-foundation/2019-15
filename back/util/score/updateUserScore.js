const { Op } = require('sequelize');
const models = require('../../db/models');
const makeReducerWithPromise = require('../common/makeReducerWithPromise');

function getPlayerByNickname(player) {
  return models.Users.findOne({
    where: {
      nickname: {
        [Op.eq]: player.nickname,
      },
    },
  });
}

function makeIdScoreTuple(acc, user, player) {
  acc.push({
    id: user.dataValues.id,
    score: user.dataValues.score + player.score,
  });

  return acc;
}

function updateUserScore(user) {
  return models.Users.update(
    {
      score: user.score,
    },
    {
      where: {
        id: {
          [Op.eq]: user.id,
        },
      },
    },
  );
}

function makeUpdatedUserNumber(acc, updatedUser) {
  acc += updatedUser[0];
  return acc;
}

async function updateUsersScore(players) {
  const users = await players.reduce(
    makeReducerWithPromise(getPlayerByNickname, makeIdScoreTuple),
    [],
  );

  await users.reduce(makeReducerWithPromise(updateUserScore, makeUpdatedUserNumber), 0);
}

module.exports = updateUsersScore;
