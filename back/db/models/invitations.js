module.exports = (sequelize) => {
  const Invitations = sequelize.define('Invitations', {}, {});
  Invitations.associate = function(models) {
    Invitations.belongsTo(models.Friends, {
      foreignKey: 'friendsId',
      targetKey: 'id',
      onDelete: 'cascade',
    });
  };
  return Invitations;
};
