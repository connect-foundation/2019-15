module.exports = (sequelize) => {
  const Friends = sequelize.define('Friends', {}, {});
  Friends.associate = function(models) {
    Friends.belongsTo(models.Users, {
      foreignKey: 'pFriendId',
      as: 'pFriend',
      targetKey: 'id',
    });
    Friends.belongsTo(models.Users, {
      foreignKey: 'sFriendId',
      as: 'sFriend',
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
