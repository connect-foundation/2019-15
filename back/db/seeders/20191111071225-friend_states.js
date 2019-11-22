module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'FriendStates',
      [
        {
          state: 'request',
        },
        {
          state: 'accept',
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('FriendStates', null, {});
  },
};
