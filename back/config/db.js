require('dotenv').config();

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
    host: process.env.DB_PROD_HOST,
    ...baseDbSetting,
  },

  development: {
    host: process.env.DB_DEV_HOST,
    ...baseDbSetting,
  },

  local: {
    host: process.env.DB_LOCAL_HOST,
    ...baseDbSetting,
  },
};
