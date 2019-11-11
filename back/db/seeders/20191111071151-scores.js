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
          userid: '1111',
          score: 10000,
        },
        {
          userid: '2222',
          score: 20000,
        },
        {
          userid: '3333',
          score: 30000,
        },
        {
          userid: '4444',
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
