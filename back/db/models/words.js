module.exports = (sequelize, DataTypes) => {
  const Words = sequelize.define(
    'Words',
    {
      word: DataTypes.STRING,
      category: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {},
  );
  Words.associate = function(models) {
    Words.belongsTo(models.Users, {
      foreignKey: 'userId',
      targetKey: 'id',
    });
  };
  return Words;
};
