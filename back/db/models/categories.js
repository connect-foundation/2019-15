module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define(
    'Categories',
    {
      category: DataTypes.STRING,
    },
    {},
  );
  Categories.associate = function(models) {
    Categories.hasMany(models.Words, {
      foreignKey: 'categoryId',
      sourceKey: 'id',
    });
  };
  return Categories;
};
