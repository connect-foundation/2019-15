module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Words',
      [
        {
          word: '강아지',
          categoryId: 2,
          userId: null,
        },
        {
          word: '고양이',
          categoryId: 2,
          userId: null,
        },
        {
          word: '치킨',
          categoryId: 1,
          userId: null,
        },
        {
          word: '피자',
          categoryId: 1,
          userId: null,
        },
        {
          word: '햄버거',
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
