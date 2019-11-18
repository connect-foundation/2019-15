module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'FriendStates',
      [
        {
          state: 'request',
        },
        {
          state: 'decline',
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('FriendStates', null, {});
  },
};
