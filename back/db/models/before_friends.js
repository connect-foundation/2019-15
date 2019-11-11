'use strict';
module.exports = (sequelize, DataTypes) => {
  const before_friends = sequelize.define(
    'before_friends',
    {
      p_friend_id: DataTypes.INTEGER,
      s_friend_id: DataTypes.INTEGER,
      friend_state_id: DataTypes.INTEGER,
    },
    {},
  );
  before_friends.associate = function(models) {
    before_friends.belongsTo(models.users, {
      as: 'p_friend_id',
      foreignKey: 'id',
    });
    before_friends.belongsTo(models.users, {
      as: 's_friend_id',
      foreignKey: 'id',
    });
    before_friends.belongsTo(models.friend_states, {
      as: 'friend_state_id',
      foreignKey: 'id',
    });
  };
  return before_friends;
};
