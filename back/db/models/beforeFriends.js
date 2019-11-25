module.exports = (sequelize) => {
  const BeforeFriends = sequelize.define('BeforeFriends', {}, {});
  BeforeFriends.associate = function(models) {
    BeforeFriends.belongsTo(models.Users, {
      foreignKey: 'pFriendId',
      targetKey: 'id',
    });
    BeforeFriends.belongsTo(models.Users, {
      foreignKey: 'sFriendId',
      targetKey: 'id',
    });
    BeforeFriends.belongsTo(models.Users, {
      foreignKey: 'friendStateId',
      targetKey: 'id',
    });
  };
  return BeforeFriends;
};
