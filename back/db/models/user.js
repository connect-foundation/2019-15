module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      userId: DataTypes.STRING,
      nickname: DataTypes.STRING,
      score: DataTypes.BIGINT,
    },
    {},
  );
  User.associate = function(models) {
    User.hasMany(models.BeforeFriend);
    User.hasMany(models.Friend);
  };
  return User;
};
