module.exports = (sequelize, DataTypes) => {
  const BeforeFriend = sequelize.define('BeforeFriend', {}, {});
  BeforeFriend.associate = function(models) {
    BeforeFriend.belongsTo(models.User, {
      as: 'p_friend_id',
      foreignKey: 'id',
    });
    BeforeFriend.belongsTo(models.User, {
      as: 's_friend_id',
      foreignKey: 'id',
    });
    BeforeFriend.belongsTo(models.User, {
      as: 'friend_state_id',
      foreignKey: 'id',
    });
  };
  return BeforeFriend;
};
