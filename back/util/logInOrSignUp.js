const { Users, Words, Op } = require('../db/models');
const getDataValues = require('../util/getDataValues');

async function logInOrSignUp(accessToken, refreshToken, profile, done) {
  const word = getDataValues(
    await Words.findOne({
      where: {
        userId: {
          [Op.eq]: null,
        },
      },
    }),
  );

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
