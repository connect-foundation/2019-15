module.exports = (sequelize, DataTypes) => {
  const DrawingHistories = sequelize.define(
    'DrawingHistories',
    {
      userId: DataTypes.INTEGER,
      word: DataTypes.STRING,
    },
    {},
  );
  DrawingHistories.associate = function(models) {
    DrawingHistories.hasMany(models.CanvasDatas, {
      foreignKey: 'questionId',
      sourceKey: 'id',
      onDelete: 'cascade',
    });
  };
  return DrawingHistories;
};
