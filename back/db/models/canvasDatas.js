module.exports = (sequelize, DataTypes) => {
  const CanvasDatas = sequelize.define(
    'CanvasDatas',
    {
      questionId: DataTypes.INTEGER,
      data: DataTypes.STRING,
    },
    {},
  );
  CanvasDatas.associate = function(models) {
    CanvasDatas.belongsTo(models.DrawingHistories, {
      foreignKey: 'questionId',
      targetKey: 'id',
      onDelete: 'cascade',
    });
  };
  return CanvasDatas;
};
