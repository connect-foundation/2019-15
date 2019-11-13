module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'invitations',
      [
        {
          friends_id: 1,
          url: 'https://github.com/eminem54',
        },
        {
          friends_id: 2,
          url: 'https://github.com/hos101010',
        },
        {
          friends_id: 3,
          url: 'https://github.com/changgunyee',
        },
        {
          friends_id: 4,
          url: 'https://github.com/einere',
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('invitations', null, {});
  },
};
