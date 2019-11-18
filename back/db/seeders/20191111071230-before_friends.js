module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'BeforeFriends',
      [
        {
          pFriendId: 1,
          sFriendId: 2,
          friendStateId: 1,
        },
        {
          pFriendId: 2,
          sFriendId: 3,
          friendStateId: 1,
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('BeforeFriends', null, {});
  },
};
