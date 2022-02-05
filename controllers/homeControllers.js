const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const userModel = require("../models/userModel.js");

exports.getIndex = (request, response) => {
  response.send("index page");
};

exports.gteAbout = (request, response) => {
  response.send("About");
};

exports.registration = async (request, response) => {
  if (!request.body) return response.sendStatus("404", "Not found");

  const { name, age, country, email, password } = request.body;

  const errorValidation = validationResult(request);

  if (!errorValidation.isEmpty()) {
    return response
      .status(400)
      .json({ message: "Registration error", errorValidation });
  }

  const newUsers = {
    name,
    age,
    country,
    email,
    password,
  };

  const ifExistUser = await userModel.findOneUser(response, {
    email: newUsers.email,
  });

  if (ifExistUser) {
    response.send({ message: "User already exist" }).status(409);
  } else {
    newUsers.password = bcrypt.hashSync(newUsers.password, 7);

    userModel.registration(response, newUsers);
  }
};

exports.login = (request, response) => {
  userModel.login(request, response);
};
