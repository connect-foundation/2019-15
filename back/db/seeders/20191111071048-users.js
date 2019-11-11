'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulfInsert(
      'users',
      [
        {
          userid: '1111',
          nickname: '이지영',
        },
        { userid: '2222', nickname: '이창권' },
        { userid: '3333', nickname: '손진아' },
        { userid: '4444', nickname: '최형준' },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
