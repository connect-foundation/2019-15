module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        { user_id: '1111', nickname: '이지영', score: '4444' },
        { user_id: '2222', nickname: '이창권', score: '3333' },
        { user_id: '3333', nickname: '손진아', score: '2222' },
        { user_id: '4444', nickname: '최형준', score: '1111' },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
