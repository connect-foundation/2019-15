module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'FriendStates',
      [
        {
          state: '요청',
        },
        {
          state: '거절',
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('FriendStates', null, {});
  },
};
