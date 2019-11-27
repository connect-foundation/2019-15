module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Friends',
      [
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
        {
          pFriendId: 4,
          sFriendId: 5,
        },

        {
          pFriendId: 4,
          sFriendId: 6,
        },

        {
          pFriendId: 4,
          sFriendId: 7,
        },
        {
          pFriendId: 4,
          sFriendId: 8,
        },
        {
          pFriendId: 4,
          sFriendId: 9,
        },
        {
          pFriendId: 4,
          sFriendId: 10,
        },
        {
          pFriendId: 4,
          sFriendId: 11,
        },
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
          pFriendId: 5,
          sFriendId: 4,
        },
        {
          pFriendId: 6,
          sFriendId: 4,
        },
        {
          pFriendId: 7,
          sFriendId: 4,
        },
        {
          pFriendId: 8,
          sFriendId: 4,
        },
        {
          pFriendId: 9,
          sFriendId: 4,
        },
        {
          pFriendId: 10,
          sFriendId: 4,
        },
        {
          pFriendId: 11,
          sFriendId: 4,
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Friends', null, {});
  },
};
