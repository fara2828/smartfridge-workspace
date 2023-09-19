const Router = require('express').Router;
const chatgptRoutes = require('../../controllers/gptRecipeController');

const chatgptRoutes = Router();

chatgptRoutes.post('/gptRecipe', chatgptRoutes.gptRecipe);
module.exports = chatgptRoutes;