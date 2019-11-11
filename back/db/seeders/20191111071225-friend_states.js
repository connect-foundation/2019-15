'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'friend_states',
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
    return queryInterface.bulkDelete('friend_states', null, {});
  },
};
