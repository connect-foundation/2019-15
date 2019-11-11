'use strict';
module.exports = (sequelize, DataTypes) => {
  const scores = sequelize.define('scores', {
    user_id: DataTypes.INTEGER,
    score: DataTypes.BIGINT
  }, {});
  scores.associate = function(models) {
    // associations can be defined here
  };
  return scores;
};