module.exports = (sequelize, DataTypes) => {
  const FriendState = sequelize.define(
    'FriendState',
    {
      state: DataTypes.STRING,
    },
    {},
  );
  FriendState.associate = function(models) {
    FriendState.hasMany(models.BeforeFriend);
  };
  return FriendState;
};
