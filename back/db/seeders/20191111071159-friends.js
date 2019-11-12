module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'friends',
      [
        {
          p_friend_id: 1,
          s_friend_id: 4,
        },
        {
          p_friend_id: 2,
          s_friend_id: 4,
        },
        {
          p_friend_id: 3,
          s_friend_id: 4,
        },
        {
          p_friend_id: 4,
          s_friend_id: 1,
        },
        {
          p_friend_id: 4,
          s_friend_id: 2,
        },
        {
          p_friend_id: 4,
          s_friend_id: 3,
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('friends', null, {});
  },
};
