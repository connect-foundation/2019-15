const uuidv4 = require('uuid/v4');
const { Users, Words, Op } = require('../../db/models');
const getRandomInt = require('../getRandomInt');

async function signUp(profile) {
  // 사용되지 않는 단어들을 찾는다
  const words = await Words.findAll({
    where: {
      userId: {
        [Op.eq]: null,
      },
    },
  });

  let newUser;
  // 사용 가능한 단어가 있는 경우
  if (words.length > 0) {
    const word = words[getRandomInt(0, words.length)];
    newUser = await Users.create({
      userId: profile.id,
      nickname: word.word,
    });

    Words.update(
      { userId: newUser.id },
      {
        where: {
          id: {
            [Op.eq]: word.id,
          },
        },
      },
    );
  } else {
    // 사용 가능한 단어가 없는 경우
    newUser = await Users.create({
      userId: profile.id,
      nickname: uuidv4(),
    });
    Words.create({
      word: newUser.nickname,
      userId: newUser.id,
    });
  }

  return newUser;
}

module.exports = signUp;
