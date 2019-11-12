'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert(
      'scores',
      [
        {
          user_id: 1,
          score: 10000,
        },
        {
          user_id: 2,
          score: 20000,
        },
        {
          user_id: 3,
          score: 30000,
        },
        {
          user_id: 4,
          score: 40000,
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('scores', null, {});
  },
};
