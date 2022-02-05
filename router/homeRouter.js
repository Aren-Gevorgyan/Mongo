const express = require("express");
const homeRouter = express.Router();
const jsonParser = express.json();
const homeControllers = require('../controllers/homeControllers.js');
const { check } = require("express-validator");

homeRouter.post(
    "/registration",
    [
      jsonParser,
      check("email", "Email should not be empty").notEmpty(),
      check(
        "password",
        "Password should not be empty, and min length 4, max length 12"
      ).isLength({ min: 4, max: 12 }),
    ],
    homeControllers.registration
);
homeRouter.post("/login", jsonParser, homeControllers.login);
homeRouter.use('/about', homeControllers.gteAbout);
homeRouter.use('/', homeControllers.getIndex);

module.exports = homeRouter;