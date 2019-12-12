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
      as: 'pFriend'
    });
    Users.hasMany(models.BeforeFriends, {
      foreignKey: 'sFriendId',
      sourceKey: 'id',
      as: 'sFriend'
    });
    Users.hasMany(models.Friends, { foreignKey: 'pFriendId', sourceKey: 'id', as: 'pFriend' });
    Users.hasMany(models.Friends, { foreignKey: 'sFriendId', sourceKey: 'id', as: 'sFriend' });
    Users.hasOne(models.Words, { foreignKey: 'userId', sourceKey: 'id' });
  };
  return Users;
};
