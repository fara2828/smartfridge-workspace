const {User, Fridge, Item, Image, Category}  = require('../database/models/models');
const { Success, Failure } = require('../types/response');
const path = require('path');
const { sequelize } = require('../config/db');



let fetch;

import('node-fetch').then((module) => {
  fetch = module.default;
}).catch((err) => {
  console.error(err);
});


exports.gptRecipe = async function (req, res) {
    console.log('gptRecipe start');
};