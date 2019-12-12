module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'Invitations',
      [
        {
          friendsId: 1,
          url: 'https://github.com/eminem54',
        },
        {
          friendsId: 11,
          url: 'https://github.com/eminem54',
        },
        {
          friendsId: 12,
          url: 'https://github.com/hos101010',
        },
        {
          friendsId: 13,
          url: 'https://github.com/changgunyee',
        },
        {
          friendsId: 14,
          url: 'https://github.com/einere',
        },
      ],
      {},
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Invitations', null, {});
  },
};
