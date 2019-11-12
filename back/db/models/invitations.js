'use strict';
module.exports = (sequelize, DataTypes) => {
  const invitations = sequelize.define('invitations', {}, {});
  invitations.associate = function(models) {
    invitations.belongsTo(models.friends, {
      as: 'friend_id',
      foreignKey: 'id',
    });
  };
  return invitations;
};
