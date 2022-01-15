const express = require("express");
const homeRouter = express.Router();
const jsonParser = express.json();
const homeControllers = require('../controllers/homeControllers.js');

homeRouter.use('/about', homeControllers.gteAbout);
homeRouter.use('/login', jsonParser, homeControllers.login);
homeRouter.use('/', homeControllers.getIndex);

module.exports = homeRouter;