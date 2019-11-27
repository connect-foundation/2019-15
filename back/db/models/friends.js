module.exports = (sequelize, DataTypes) => {
  const Friends = sequelize.define('Friends', {}, {});
  Friends.associate = function(models) {
    Friends.belongsTo(models.Users, {
      foreignKey: 'pFriendId',
      targetKey: 'id',
    });
    Friends.belongsTo(models.Users, {
      foreignKey: 'sFriendId',
      targetKey: 'id',
    });
    Friends.hasMany(models.Invitations, {
      foreignKey: 'friendsId',
      sourceKey: 'id',
      onDelete: 'cascade',
    });
  };
  return Friends;
};
