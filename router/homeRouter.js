const express = require("express");
const homeRouter = express.Router();
const homeControllers = require('../controllers/homeControllers.js');

homeRouter.use('/about', homeControllers.gteAbout);
homeRouter.use('/', homeControllers.getIndex);

module.exports = homeRouter;