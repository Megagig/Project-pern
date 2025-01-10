const { Sequelize } = require('sequelize');
const database = require('./database');

const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(database[env]);

module.exports = sequelize;
