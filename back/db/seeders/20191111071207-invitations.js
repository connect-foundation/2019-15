'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'invitations',
      [
        {
          frined_id: 1,
          url: 'https://github.com/eminem54',
        },
        {
          frined_id: 2,
          url: 'https://github.com/hos101010',
        },
        {
          frined_id: 3,
          url: 'https://github.com/changgunyee',
        },
        {
          frined_id: 4,
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
