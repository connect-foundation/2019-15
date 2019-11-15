module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'BeforeFriends',
      [
        {
          p_friend_id: 1,
          s_friend_id: 2,
          friend_state_id: 1,
        },
        {
          p_friend_id: 2,
          s_friend_id: 3,
          friend_state_id: 1,
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('BeforeFriends', null, {});
  },
};
