module.exports = (sequelize, DataTypes) => {
  const Invitations = sequelize.define(
    'Invitations',
    {
      roomId: DataTypes.STRING,
    },
    {},
  );
  Invitations.associate = function(models) {
    Invitations.belongsTo(models.Friends, {
      foreignKey: 'friendsId',
      targetKey: 'id',
      onDelete: 'cascade',
    });
  };
  return Invitations;
};
