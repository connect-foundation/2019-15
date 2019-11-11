'use strict';
module.exports = (sequelize, DataTypes) => {
  const before_friends = sequelize.define('before_friends', {
    p_friend_id: DataTypes.INTEGER,
    s_friend_id: DataTypes.INTEGER,
    friend_state_id: DataTypes.INTEGER
  }, {});
  before_friends.associate = function(models) {
    // associations can be defined here
  };
  return before_friends;
};