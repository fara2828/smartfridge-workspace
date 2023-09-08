const Router = require('express').Router;
const userController = require('../../controllers/userController');

const userRouter = Router();

// userRouter.post('/editAlias', userController.editAlias);

// userRouter.post('/search', userController.search);

// userRouter.post('/quit', userController.quit);

userRouter.post('/login', userController.login);

// userRouter.get('/login', userController.loading);

module.exports = userRouter;
