const { MAX_INT } = require('../../graphql/resolvers/constants/ranking');

const getRandomInt = () => {
  return Math.floor(Math.random() * MAX_INT);
};

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          userId: getRandomInt().toString(),
          nickname: '강아지',
          score: getRandomInt(),
        },
        {
          userId: getRandomInt().toString(),
          nickname: '고양이',
          score: getRandomInt(),
        },
        {
          userId: getRandomInt().toString(),
          nickname: '치킨',
          score: getRandomInt(),
        },
        {
          userId: '1111',
          nickname: '피자',
          score: '1111',
        },
        {
          userId: getRandomInt().toString(),
          nickname: '곤드레밥',
          score: getRandomInt(),
        },
        {
          userId: getRandomInt().toString(),
          nickname: '두부밥',
          score: getRandomInt(),
        },
        {
          userId: getRandomInt().toString(),
          nickname: '보리밥',
          score: getRandomInt(),
        },
        {
          userId: getRandomInt().toString(),
          nickname: '비빔밥',
          score: getRandomInt(),
        },
        {
          userId: getRandomInt().toString(),
          nickname: '쌀밥',
          score: getRandomInt(),
        },
        {
          userId: getRandomInt().toString(),
          nickname: '약밥',
          score: getRandomInt(),
        },
        {
          userId: getRandomInt().toString(),
          nickname: '볶음밥',
          score: getRandomInt(),
        },
        {
          userId: getRandomInt().toString(),
          nickname: '영양밥',
          score: getRandomInt(),
        },
        {
          userId: getRandomInt().toString(),
          nickname: '무감자밥',
          score: getRandomInt(),
        },
        {
          userId: getRandomInt().toString(),
          nickname: '닭죽',
          score: getRandomInt(),
        },
        {
          userId: getRandomInt().toString(),
          nickname: '방풍죽',
          score: getRandomInt(),
        },
        {
          userId: getRandomInt().toString(),
          nickname: '아구찜',
          score: getRandomInt(),
        },
        {
          userId: getRandomInt().toString(),
          nickname: '전복죽',
          score: getRandomInt(),
        },
        {
          userId: getRandomInt().toString(),
          nickname: '타락죽',
          score: getRandomInt(),
        },
        {
          userId: getRandomInt().toString(),
          nickname: '상이죽',
          score: getRandomInt(),
        },
        {
          userId: getRandomInt().toString(),
          nickname: '호박죽',
          score: getRandomInt(),
        },
        {
          userId: getRandomInt().toString(),
          nickname: '팥죽',
          score: getRandomInt(),
        },
        {
          userId: getRandomInt().toString(),
          nickname: '배추김치',
          score: getRandomInt(),
        },
      ],
      {},
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
