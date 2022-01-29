const ObjectId = require("mongodb").ObjectId;
const userModel = require("../model/userModel.js");
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');

exports.getUsers = (request, response) => {
  userModel.findAllUser(response);
};

exports.getOneUser = (request, response) => {
  const userId = new ObjectId(request.params.id);
  userModel.findUser(response, { _id: userId, deleted: { $ne: true } });
};

exports.registration = async (request, response) => {
  if (!request.body) return response.sendStatus("404", "Not found");

  const errorValidation = validationResult(request);

  if(!errorValidation.isEmpty()){
    return response.status(400).json({message: "Registration error", errorValidation});
  }

  const newUsers = {
    name: request.body.name,
    age: request.body.age,
    country: request.body.country,
    email: request.body.email,
    password: request.body.password,
  };

  const ifExistUser = await userModel.findUser(response, {
    email: newUsers.email,
  });

  if (ifExistUser.length > 0) {
    response.send({ message: "User already exist" }).status(409);
  } else {
    newUsers.password = bcrypt.hashSync(newUsers.password, 7);

    userModel.registration(response, newUsers);
  }
};

exports.login = (request, response) => {
  userModel.login(request, response)
}

exports.upgradeUser = (request, response) => {
  const userId = request.params.id;

  const data = {
    age: request.body.age,
    name: request.body.name,
    country: request.body.country,
  };

  userModel.upgradeUser(response, userId, data);
};

exports.deleteUser = (request, response) => {
  const userId = request.params.id;

  userModel.deleteUser(response, userId);
};
