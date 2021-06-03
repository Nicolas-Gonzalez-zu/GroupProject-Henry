require('dotenv').config({ path: '../../.env' });

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE_DEVELOPMENT,
    host: process.env.HOST_NAME,
    dialect: 'postgres',
    logging: false,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE_TEST,
    host: process.env.HOST_NAME,
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE_PRODUCTION,
    host: process.env.HOST_NAME,
    dialect: 'postgres',
    logging: false,
  },
};
