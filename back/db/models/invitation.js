module.exports = (sequelize, DataTypes) => {
  const Invitation = sequelize.define('Invitation', {}, {});
  Invitation.associate = function(models) {
    Invitation.belongsTo(models.Friend, {
      as: 'friend',
      foreignKey: 'id',
    });
  };
  return Invitation;
};
