module.exports = {
  up: (queryInterface) => {
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

  down: (queryInterface) => {
    return queryInterface.bulkDelete('FriendStates', null, {});
  },
};
