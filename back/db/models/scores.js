'use strict';
module.exports = (sequelize, DataTypes) => {
  const scores = sequelize.define(
    'scores',
    {
      score: DataTypes.BIGINT,
    },
    {},
  );
  scores.associate = function(models) {
    scores.belongsTo(models.users, { as: 'user_id', foreignkey: 'id' });
  };
  return scores;
};
