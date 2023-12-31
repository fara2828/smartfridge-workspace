'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.json')[env];
const { User, Fridge, Item } = require('./models');

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.User = User;
db.Fridge = Fridge;
db.Item = Item;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
