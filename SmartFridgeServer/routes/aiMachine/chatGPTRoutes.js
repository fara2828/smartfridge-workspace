const Router = require('express').Router;
const chatgptController = require('../../controllers/gptRecipeController');

const chatgptRouter = Router();


chatgptRouter.post('/gptRecipe', chatgptController.gptRecipe);

module.exports = chatgptRouter;