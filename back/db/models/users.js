module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      user_id: DataTypes.STRING,
      nickname: DataTypes.STRING,
    },
    {},
  );
  users.associate = function(models) {
    users.hasOne(models.scores);
    users.hasMany(models.before_friends);
    users.hasMany(models.friends);
  };
  return users;
};
