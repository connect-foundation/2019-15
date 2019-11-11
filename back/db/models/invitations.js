'use strict';
module.exports = (sequelize, DataTypes) => {
  const invitations = sequelize.define(
    'invitations',
    {
      friends_id: DataTypes.INTEGER,
    },
    {},
  );
  invitations.associate = function(models) {
    invitations.belongsTo(models.friends, {
      as: 'friends_id',
      foreignKey: 'id',
    });
  };
  return invitations;
};
