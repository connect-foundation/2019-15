module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Friends',
      [
        {
          pFriendId: 1,
          sFriendId: 4,
        },
        {
          pFriendId: 2,
          sFriendId: 4,
        },
        {
          pFriendId: 3,
          sFriendId: 4,
        },
        {
          pFriendId: 4,
          sFriendId: 1,
        },
        {
          pFriendId: 4,
          sFriendId: 2,
        },
        {
          pFriendId: 4,
          sFriendId: 3,
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Friends', null, {});
  },
};
