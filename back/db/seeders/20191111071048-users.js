'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          user_id: '1111',
          nickname: '이지영',
        },
        { user_id: '2222', nickname: '이창권' },
        { user_id: '3333', nickname: '손진아' },
        { user_id: '4444', nickname: '최형준' },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
