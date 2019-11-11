'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'friend_state',
      [
        {
          state: '요청',
        },
        {
          state: '거절',
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('friend_state', null, {});
  },
};
