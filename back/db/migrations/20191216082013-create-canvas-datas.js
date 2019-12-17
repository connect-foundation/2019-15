module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CanvasDatas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      questionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'DrawingHistories',
          key: 'id',
        },
      },
      data: {
        type: Sequelize.TEXT('long'),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('CanvasDatas');
  },
};
