const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

// eslint-disable-next-line import/no-dynamic-require
const config = require(`${__dirname}/../../config/db.js`)[process.env.NODE_ENV];
console.log(process.env.NODE_ENV);
const basename = path.basename(__filename);
const models = {};
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}
fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js',
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    models[model.name] = model;
  });
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});
models.sequelize = sequelize;
models.Sequelize = Sequelize;
module.exports = models;
