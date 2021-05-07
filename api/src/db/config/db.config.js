require('dotenv').config({ path: '../../.env' });

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.database_development,
    host: process.env.HOST_NAME,
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.database_test,
    host: process.env.HOST_NAME,
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.database_production,
    host: process.env.HOST_NAME,
    dialect: 'postgres',
  },
};
