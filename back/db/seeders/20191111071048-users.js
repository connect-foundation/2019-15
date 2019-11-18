const { MAX_SCORE } = require('../../graphql/resolvers/constants/ranking');

const getRandomInt = () => {
  return Math.floor(Math.random() * MAX_SCORE);
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          userId: '1111',
          nickname: '이지영',
          score: '1111',
        },
        {
          userId: getRandomInt().toString(),
          nickname: '이창권',
          score: getRandomInt(),
        },
        {
          userId: getRandomInt().toString(),
          nickname: '손진아',
          score: getRandomInt(),
        },
        {
          userId: getRandomInt().toString(),
          nickname: '최형준',
          score: getRandomInt(),
        },
        {
          userId: getRandomInt().toString(),
          nickname: '조영도',
          score: getRandomInt(),
        },
        {
          userId: getRandomInt().toString(),
          nickname: '육지수',
          score: getRandomInt(),
        },
        {
          userId: getRandomInt().toString(),
          nickname: '김도현',
          score: getRandomInt(),
        },
        {
          userId: getRandomInt().toString(),
          nickname: '강관훈',
          score: getRandomInt(),
        },
        {
          userId: getRandomInt().toString(),
          nickname: '이수배',
          score: getRandomInt(),
        },
        {
          userId: getRandomInt().toString(),
          nickname: '이아람',
          score: getRandomInt(),
        },
        {
          userId: getRandomInt().toString(),
          nickname: '김동균',
          score: getRandomInt(),
        },
        {
          userId: getRandomInt().toString(),
          nickname: '신용우',
          score: getRandomInt(),
        },
        {
          userId: getRandomInt().toString(),
          nickname: '김민성',
          score: getRandomInt(),
        },
        {
          userId: getRandomInt().toString(),
          nickname: '이준호',
          score: getRandomInt(),
        },
        {
          userId: getRandomInt().toString(),
          nickname: '성재호',
          score: getRandomInt(),
        },
        {
          userId: getRandomInt().toString(),
          nickname: '임문수',
          score: getRandomInt(),
        },
        {
          userId: getRandomInt().toString(),
          nickname: '김재현',
          score: getRandomInt(),
        },
        {
          userId: getRandomInt().toString(),
          nickname: '이재민',
          score: getRandomInt(),
        },
        {
          userId: getRandomInt().toString(),
          nickname: '이용호',
          score: getRandomInt(),
        },
        {
          userId: getRandomInt().toString(),
          nickname: '김경래',
          score: getRandomInt(),
        },
        {
          userId: getRandomInt().toString(),
          nickname: '황선준',
          score: getRandomInt(),
        },
        {
          userId: getRandomInt().toString(),
          nickname: '김건욱',
          score: getRandomInt(),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
