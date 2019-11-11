'use strict';
module.exports = (sequelize, DataTypes) => {
  const invitations = sequelize.define('invitations', {
    friends_id: DataTypes.INTEGER
  }, {});
  invitations.associate = function(models) {
    // associations can be defined here
  };
  return invitations;
};