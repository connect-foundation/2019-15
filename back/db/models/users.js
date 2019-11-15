module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      userId: DataTypes.STRING,
      nickname: DataTypes.STRING,
      score: DataTypes.BIGINT,
    },
    {},
  );
  Users.associate = function(models) {
    Users.hasMany(models.BeforeFriends, {
      foreignKey: 'pFriendId',
      sourceKey: 'id',
    });
    Users.hasMany(models.BeforeFriends, {
      foreignKey: 'sFriendId',
      sourceKey: 'id',
    });
    Users.hasMany(models.Friends, { foreignKey: 'pFriendId', sourceKey: 'id' });
    Users.hasMany(models.Friends, { foreignKey: 'sFriendId', sourceKey: 'id' });
  };
  return Users;
};
