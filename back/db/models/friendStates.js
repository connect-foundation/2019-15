module.exports = (sequelize, DataTypes) => {
  const FriendStates = sequelize.define(
    'FriendStates',
    {
      state: DataTypes.STRING,
    },
    {},
  );
  FriendStates.associate = function(models) {
    FriendStates.hasMany(models.BeforeFriends, {
      foreignKey: 'friendStateId',
      sourceKey: 'id',
    });
  };
  return FriendStates;
};
