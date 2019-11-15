module.exports = (sequelize, DataTypes) => {
  const Friend = sequelize.define('Friend', {}, {});
  Friend.associate = function(models) {
    Friend.belongsTo(models.User, { as: 'pFriend', foreignkey: 'id' });
    Friend.belongsTo(models.User, { as: 'sFriend', foreignkey: 'id' });
    Friend.hasMany(models.Invitation);
  };
  return Friend;
};
