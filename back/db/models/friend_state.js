'use strict';
module.exports = (sequelize, DataTypes) => {
  const friend_state = sequelize.define('friend_state', {
    state: DataTypes.STRING
  }, {});
  friend_state.associate = function(models) {
    // associations can be defined here
  };
  return friend_state;
};