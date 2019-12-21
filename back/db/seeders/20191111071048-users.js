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
          score: 13800,
          avatar: 0,
        },
        {
          userId: getRandomInt().toString(),
          nickname: '고양이',
          score: 53060,
          avatar: 1,
        },
        {
          userId: getRandomInt().toString(),
          nickname: '치킨',
          score: 32000,
          avatar: 2,
        },
        {
          userId: '1111',
          nickname: '피자',
          score: 1111,
          avatar: 2,
        },
        {
          userId: getRandomInt().toString(),
          nickname: '곤드레밥',
          score: 23800,
          avatar: 1,
        },
        {
          userId: getRandomInt().toString(),
          nickname: '두부밥',
          score: 19020,
          avatar: 0,
        },
        {
          userId: getRandomInt().toString(),
          nickname: '보리밥',
          score: 7810,
          avatar: 2,
        },
        {
          userId: getRandomInt().toString(),
          nickname: '비빔밥',
          score: 12090,
          avatar: 1,
        },
        {
          userId: getRandomInt().toString(),
          nickname: '쌀밥',
          score: 8750,
          avatar: 1,
        },
        {
          userId: getRandomInt().toString(),
          nickname: '약밥',
          score: 3200,
          avatar: 0,
        },
        {
          userId: getRandomInt().toString(),
          nickname: '볶음밥',
          score: 1020,
          avatar: 0,
        },
        {
          userId: getRandomInt().toString(),
          nickname: '영양밥',
          score: 2870,
          avatar: 1,
        },
        {
          userId: getRandomInt().toString(),
          nickname: '무감자밥',
          score: 9870,
          avatar: 2,
        },
        {
          userId: getRandomInt().toString(),
          nickname: '닭죽',
          score: 3200,
          avatar: 1,
        },
        {
          userId: getRandomInt().toString(),
          nickname: '방풍죽',
          score: 0,
          avatar: 0,
        },
        {
          userId: getRandomInt().toString(),
          nickname: '아구찜',
          score: 790,
          avatar: 0,
        },
        {
          userId: getRandomInt().toString(),
          nickname: '전복죽',
          score: 990,
          avatar: 0,
        },
        {
          userId: getRandomInt().toString(),
          nickname: '타락죽',
          score: 200,
          avatar: 1,
        },
        {
          userId: getRandomInt().toString(),
          nickname: '상이죽',
          score: 150,
          avatar: 2,
        },
        {
          userId: getRandomInt().toString(),
          nickname: '호박죽',
          score: 800,
          avatar: 2,
        },
        {
          userId: getRandomInt().toString(),
          nickname: '팥죽',
          score: 0,
          avatar: 2,
        },
        {
          userId: getRandomInt().toString(),
          nickname: '배추김치',
          score: 1000,
          avatar: 1,
        },
        {
          userId: getRandomInt().toString(),
          nickname: '도라지',
          score: 0,
          avatar: 0,
        },
        {
          userId: getRandomInt().toString(),
          nickname: '케냐',
          score: 0,
          avatar: 1,
        },
        {
          userId: getRandomInt().toString(),
          nickname: '베트남',
          score: 0,
          avatar: 2,
        },
        {
          userId: getRandomInt().toString(),
          nickname: '골저스',
          score: 0,
          avatar: 1,
        },
        {
          userId: getRandomInt().toString(),
          nickname: '지져스',
          score: 0,
          avatar: 2,
        },
        {
          userId: getRandomInt().toString(),
          nickname: '도라이',
          score: 0,
          avatar: 2,
        },
        {
          userId: getRandomInt().toString(),
          nickname: '공무원',
          score: 0,
          avatar: 1,
        },
        {
          userId: getRandomInt().toString(),
          nickname: '골덴바지',
          score: 0,
          avatar: 2,
        },
        {
          userId: getRandomInt().toString(),
          nickname: '통바지',
          score: 0,
          avatar: 2,
        },
      ],
      {},
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
