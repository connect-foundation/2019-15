module.exports = (sequelize, DataTypes) => {
  const Friend = sequelize.define('Friend', {}, {});
  Friend.associate = function(models) {
    Friend.belongsTo(models.User, { as: 'p_friend_id', foreignkey: 'id' });
    Friend.belongsTo(models.User, { as: 's_friend_id', foreignkey: 'id' });
    Friend.hasMany(models.Invitation);
  };
  return Friend;
};
