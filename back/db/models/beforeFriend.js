module.exports = (sequelize, DataTypes) => {
  const BeforeFriend = sequelize.define('BeforeFriend', {}, {});
  BeforeFriend.associate = function(models) {
    BeforeFriend.belongsTo(models.User, {
      as: 'pFriend',
      foreignKey: 'id',
    });
    BeforeFriend.belongsTo(models.User, {
      as: 'sFriend',
      foreignKey: 'id',
    });
    BeforeFriend.belongsTo(models.User, {
      as: 'friendState',
      foreignKey: 'id',
    });
  };
  return BeforeFriend;
};
