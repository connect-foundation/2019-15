module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'Invitations',
      [
        {
          friendsId: 1,
          roomId: 'https://github.com/eminem54',
        },

        {
          friendsId: 12,
          roomId: 'https://github.com/eminem54',
        },
        {
          friendsId: 13,
          roomId: 'https://github.com/eminem54',
        },
        {
          friendsId: 14,
          roomId: 'https://github.com/eminem54',
        },
        {
          friendsId: 15,
          roomId: 'https://github.com/eminem54',
        },
        {
          friendsId: 16,
          roomId: 'https://github.com/eminem54',
        },
        {
          friendsId: 17,
          roomId: 'https://github.com/eminem54',
        },
        {
          friendsId: 18,
          roomId: 'https://github.com/eminem54',
        },
        {
          friendsId: 19,
          roomId: 'https://github.com/eminem54',
        },
        {
          friendsId: 20,
          roomId: 'https://github.com/eminem54',
        },
        {
          friendsId: 21,
          roomId: 'https://github.com/eminem54',
        },
        {
          friendsId: 22,
          roomId: 'https://github.com/hos101010',
        },
        {
          friendsId: 13,
          roomId: 'https://github.com/changgunyee',
        },
        {
          friendsId: 14,
          roomId: 'https://github.com/einere',
        },
      ],
      {},
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Invitations', null, {});
  },
};
