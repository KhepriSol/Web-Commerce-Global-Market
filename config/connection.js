require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = new Sequelize('ecommerce_db', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
