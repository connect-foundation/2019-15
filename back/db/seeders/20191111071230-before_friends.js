module.exports = {
  up: (queryInterface) => {
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
        {
          pFriendId: 6,
          sFriendId: 5,
          friendStateId: 1,
        },
        {
          pFriendId: 7,
          sFriendId: 5,
          friendStateId: 1,
        },
        {
          pFriendId: 8,
          sFriendId: 5,
          friendStateId: 1,
        },
        {
          pFriendId: 9,
          sFriendId: 5,
          friendStateId: 2,
        },
        {
          pFriendId: 10,
          sFriendId: 5,
          friendStateId: 2,
        },
        {
          pFriendId: 11,
          sFriendId: 5,
          friendStateId: 1,
        },
        {
          pFriendId: 12,
          sFriendId: 5,
          friendStateId: 1,
        },
      ],
      {},
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('BeforeFriends', null, {});
  },
};
