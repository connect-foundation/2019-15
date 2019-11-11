'use strict';
module.exports = (sequelize, DataTypes) => {
  const friends = sequelize.define('friends', {
    p_friend_id: DataTypes.INTEGER,
    s_friend_id: DataTypes.INTEGER
  }, {});
  friends.associate = function(models) {
    // associations can be defined here
  };
  return friends;
};