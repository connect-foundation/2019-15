module.exports = (sequelize, DataTypes) => {
  const Invitation = sequelize.define('Invitation', {}, {});
  Invitation.associate = function(models) {
    Invitation.belongsTo(models.Friend, {
      as: 'friend_id',
      foreignKey: 'id',
    });
  };
  return Invitation;
};
