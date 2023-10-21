const Router = require('express').Router;
const chatgptController = require('../../controllers/gptRecipeController');

const chatgptRouter = Router();


chatgptRouter.post('/:id/gptRecipe', chatgptController.gptRecipe);

module.exports = chatgptRouter;