
const express = require("express");
const jsonParser = express.json();
const userRouter = express.Router();
const userControllers = require('../controllers/userControllers.js');

userRouter.get('/:id', userControllers.getOneUser);
userRouter.delete('/:id', userControllers.deleteUser);
userRouter.put('/:id', jsonParser, userControllers.upgradeUser);
userRouter.get('/', userControllers.getUsers);
userRouter.post('/', jsonParser, userControllers.createUser);

module.exports = userRouter;