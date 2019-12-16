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
          pFriendId: 11,
          sFriendId: 5,
          friendStateId: 1,
        },
        {
          pFriendId: 12,
          sFriendId: 5,
          friendStateId: 1,
        },
        {
          pFriendId: 4,
          sFriendId: 1,
          friendStateId: 2,
        },
        {
          pFriendId: 4,
          sFriendId: 2,
          friendStateId: 2,
        },
        {
          pFriendId: 4,
          sFriendId: 3,
          friendStateId: 2,
        },
        {
          pFriendId: 4,
          sFriendId: 5,
          friendStateId: 2,
        },

        {
          pFriendId: 4,
          sFriendId: 6,
          friendStateId: 2,
        },
        {
          pFriendId: 4,
          sFriendId: 7,
          friendStateId: 2,
        },
        {
          pFriendId: 4,
          sFriendId: 8,
          friendStateId: 2,
        },
        {
          pFriendId: 4,
          sFriendId: 9,
          friendStateId: 2,
        },
        {
          pFriendId: 4,
          sFriendId: 10,
          friendStateId: 2,
        },
        {
          pFriendId: 4,
          sFriendId: 11,
          friendStateId: 2,
        },
        {
          pFriendId: 1,
          sFriendId: 4,
          friendStateId: 2,
        },
        {
          pFriendId: 2,
          sFriendId: 4,
          friendStateId: 2,
        },
        {
          pFriendId: 3,
          sFriendId: 4,
          friendStateId: 2,
        },
        {
          pFriendId: 5,
          sFriendId: 4,
          friendStateId: 2,
        },
        {
          pFriendId: 6,
          sFriendId: 4,
          friendStateId: 2,
        },
        {
          pFriendId: 7,
          sFriendId: 4,
          friendStateId: 2,
        },
        {
          pFriendId: 8,
          sFriendId: 4,
          friendStateId: 2,
        },
        {
          pFriendId: 9,
          sFriendId: 4,
          friendStateId: 2,
        },
        {
          pFriendId: 10,
          sFriendId: 4,
          friendStateId: 2,
        },
        {
          pFriendId: 11,
          sFriendId: 4,
          friendStateId: 2,
        },
        {
          pFriendId: 12,
          sFriendId: 4,
          friendStateId: 2,
        },
        {
          pFriendId: 13,
          sFriendId: 4,
          friendStateId: 1,
        },
        {
          pFriendId: 14,
          sFriendId: 4,
          friendStateId: 1,
        },
        {
          pFriendId: 15,
          sFriendId: 4,
          friendStateId: 1,
        },
        {
          pFriendId: 16,
          sFriendId: 4,
          friendStateId: 1,
        },
        {
          pFriendId: 17,
          sFriendId: 4,
          friendStateId: 1,
        },
        {
          pFriendId: 18,
          sFriendId: 4,
          friendStateId: 1,
        },
        {
          pFriendId: 19,
          sFriendId: 4,
          friendStateId: 1,
        },
        {
          pFriendId: 20,
          sFriendId: 4,
          friendStateId: 1,
        },
        {
          pFriendId: 21,
          sFriendId: 4,
          friendStateId: 1,
        },
        {
          pFriendId: 22,
          sFriendId: 4,
          friendStateId: 1,
        },
        {
          pFriendId: 23,
          sFriendId: 4,
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
