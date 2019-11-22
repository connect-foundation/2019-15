module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Friends',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        pFriendId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id',
          },
        },
        sFriendId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id',
          },
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
      },
      {
        uniqueKeys: {
          Items_unique: {
            fields: ['pFriendId', 'sFriendId'],
          },
        },
      },
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Friends');
  },
};
