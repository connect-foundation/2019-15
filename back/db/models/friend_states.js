module.exports = (sequelize, DataTypes) => {
  const friend_states = sequelize.define(
    'friend_states',
    {
      state: DataTypes.STRING,
    },
    {},
  );
  friend_states.associate = function(models) {
    friend_states.hasMany(models.before_friends);
  };
  return friend_states;
};
