module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('DrawingHistories', [
      { userId: 4, word: '안경' },
      { userId: 4, word: '돼지' },
    ]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('DrawingHistories', null, {});
  },
};
