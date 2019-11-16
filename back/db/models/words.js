module.exports = (sequelize, DataTypes) => {
  const Words = sequelize.define(
    'Words',
    {
      word: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {},
  );
  Words.associate = function(models) {
    Words.belongsTo(models.Categories, {
      foreignKey: 'categoryId',
      targetKey: 'id',
    });
    Words.belongsTo(models.Users, {
      foreignKey: 'userId',
      targetKey: 'id',
    });
  };
  return Words;
};
