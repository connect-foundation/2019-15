const { Users, Words, Op } = require('../db/models');
const getRandomInt = require('../util/getRandomInt');

async function logInOrSignUp(accessToken, refreshToken, profile, done) {
  const words = await Words.findAll({
    where: {
      userId: {
        [Op.eq]: null,
      },
    },
  });
  const word = words[getRandomInt(0, words.length)];

  const [users, isCreated] = await Users.findOrCreate({
    where: {
      userId: profile.id,
    },
    defaults: {
      nickname: word.word,
    },
  });

  if (isCreated) {
    Words.update(
      {
        userId: users.id,
      },
      {
        where: {
          id: {
            [Op.eq]: word.id,
          },
        },
      },
    );
  }

  return done(null, {
    id: profile.id,
    displayName: profile.displayName,
    nickname: word.word,
  });
}

module.exports = logInOrSignUp;
