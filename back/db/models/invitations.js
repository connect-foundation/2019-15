module.exports = (sequelize, DataTypes) => {
  const Invitations = sequelize.define('Invitations', {}, {});
  Invitations.associate = function(models) {
    Invitations.belongsTo(models.Friends, {
      foreignKey: 'friendsId',
      targetKey: 'id',
    });
  };
  return Invitations;
};
