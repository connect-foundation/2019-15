const initialData = require('../initialCanvasDatas');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('CanvasDatas', [
      { questionId: 1, data: initialData.glassesFirst },
      { questionId: 1, data: initialData.glassesSecond },
      { questionId: 1, data: initialData.glassesThird },
      { questionId: 2, data: initialData.pigFirst },
      { questionId: 2, data: initialData.pigSecond },
      { questionId: 2, data: initialData.pigThird },
    ]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('CanvasDatas', null, {});
  },
};
