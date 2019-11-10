require('dotenv').config();

console.log(process.env.DB_USER);
const baseDbSetting = {
  username: process.env.DB_USER,
  password: process.env.DB_PW,
  dialect: process.env.DB_DIALECT,
  database: process.env.DB_NAME,
  pool: {
    max: 100,
    min: 0,
    idle: 10000,
  },
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
    timestamps: true,
  },
};

module.exports = {
  production: {
    host: process.env.DB_HOST,
    ...baseDbSetting,
  },

  development: {
    host: process.env.DB_DEV_HOST,
    ...baseDbSetting,
  },

  test: {
    host: process.env.DB_DEV_HOST,
    ...baseDbSetting,
  },
};
