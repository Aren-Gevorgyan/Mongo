const userModel = require("../model/userModel.js");

exports.getUsers = (request, response) => {
  userModel.findAllUser(response);
};

exports.getOneUser = (request, response) => {
  const userId = request.params.id;
  userModel.findUserById(response, userId);
};

exports.createUser = (request, response) => {
  if (!request.body) return response.sendStatus("404", "Not found");

  const newUsers = {
    name: request.body.name,
    age: request.body.age,
    country: request.body.country,
  };

  userModel.createUser(response, newUsers);
};

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
