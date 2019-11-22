module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Words',
      [
        {
          word: '강아지',
          categoryId: 2,
          userId: '1',
        },
        {
          word: '고양이',
          categoryId: 2,
          userId: '2',
        },
        {
          word: '치킨',
          categoryId: 1,
          userId: '3',
        },
        {
          word: '피자',
          categoryId: 1,
          userId: '4',
        },
        {
          word: '곤드레밥',
          categoryId: 1,
          userId: '5',
        },
        {
          word: '두부밥',
          categoryId: 1,
          userId: '6',
        },
        {
          word: '보리밥',
          categoryId: 1,
          userId: '7',
        },
        {
          word: '비빔밥',
          categoryId: 1,
          userId: '8',
        },
        {
          word: '쌀밥',
          categoryId: 1,
          userId: '9',
        },
        {
          word: '약밥',
          categoryId: 1,
          userId: '10',
        },
        {
          word: '볶음밥',
          categoryId: 1,
          userId: '11',
        },
        {
          word: '영양밥',
          categoryId: 1,
          userId: '12',
        },
        {
          word: '무감자밥',
          categoryId: 1,
          userId: '13',
        },
        {
          word: '닭죽',
          categoryId: 1,
          userId: '14',
        },
        {
          word: '방풍죽',
          categoryId: 1,
          userId: '15',
        },
        {
          word: '아구찜',
          categoryId: 1,
          userId: '16',
        },
        {
          word: '전복죽',
          categoryId: 1,
          userId: '17',
        },
        {
          word: '타락죽',
          categoryId: 1,
          userId: '18',
        },
        {
          word: '상이죽',
          categoryId: 1,
          userId: '19',
        },
        {
          word: '호박죽',
          categoryId: 1,
          userId: '20',
        },
        {
          word: '팥죽',
          categoryId: 1,
          userId: '21',
        },
        {
          word: '배추김치',
          categoryId: 1,
          userId: '22',
        },
        {
          word: '동치미',
          categoryId: 1,
          userId: null,
        },
        {
          word: '파김치',
          categoryId: 1,
          userId: null,
        },
        {
          word: '김치전',
          categoryId: 1,
          userId: null,
        },
        {
          word: '참이슬',
          categoryId: 1,
          userId: null,
        },
        {
          word: '동래파전',
          categoryId: 1,
          userId: null,
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Words', null, {});
  },
};
