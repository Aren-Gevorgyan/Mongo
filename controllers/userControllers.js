const ObjectId = require("mongodb").ObjectId;
const userModel = require("../model/userModel.js");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

exports.getUsers = (request, response) => {
  userModel.findAllUser(response);
};

exports.getOneUser = (request, response) => {
  const userId = new ObjectId(request.params.id);
  userModel.findUser(response, { _id: userId, deleted: { $ne: true } });
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

exports.upgradeUser = (request, response) => {
  const userId = request.params.id;

  const { age, name, country } = request.body;

  const data = {
    age,
    name,
    country,
  };

  userModel.upgradeUser(response, userId, data);
};

exports.deleteUser = (request, response) => {
  console.log(request, "request, upgradeUser");

  const userId = request.params.id;

  userModel.deleteUser(response, userId);
};
