const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    })
  : new Sequelize('minisaastask', 'postgres', 'admin', {
      host: 'localhost',
      dialect: 'postgres',
      logging: false,
    });

module.exports = sequelize;
