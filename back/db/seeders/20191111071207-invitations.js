module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Invitations',
      [
        {
          friendsId: 1,
          url: 'https://github.com/eminem54',
        },
        {
          friendsId: 2,
          url: 'https://github.com/hos101010',
        },
        {
          friendsId: 3,
          url: 'https://github.com/changgunyee',
        },
        {
          friendsId: 4,
          url: 'https://github.com/einere',
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Invitations', null, {});
  },
};
