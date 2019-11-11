'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'friends',
      [
        {
          p_friend_id: '1111',
          s_friend_id: '4444',
        },
        {
          p_friend_id: '2222',
          s_friend_id: '4444',
        },
        {
          p_friend_id: '3333',
          s_friend_id: '4444',
        },
        {
          p_friend_id: '4444',
          s_friend_id: '1111',
        },
        {
          p_friend_id: '4444',
          s_friend_id: '2222',
        },
        {
          p_friend_id: '4444',
          s_friend_id: '3333',
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('friends', null, {});
  },
};
