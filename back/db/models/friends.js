module.exports = (sequelize, DataTypes) => {
  const friends = sequelize.define('friends', {}, {});
  friends.associate = function(models) {
    friends.belongsTo(models.users, { as: 'p_friend_id', foreignkey: 'id' });
    friends.belongsTo(models.users, { as: 's_friend_id', foreignkey: 'id' });
    friends.hasMany(models.invitations);
  };
  return friends;
};
