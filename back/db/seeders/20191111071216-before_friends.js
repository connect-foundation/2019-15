'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'before_friends',
      [
        {
          p_friend_id: '1111',
          s_friend_id: '2222',
          state: 1,
        },
        {
          p_friend_id: '2222',
          s_friend_id: '3333',
          state: 1,
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('before_friends', null, {});
  },
};
