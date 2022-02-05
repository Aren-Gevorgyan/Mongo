const ObjectId = require("mongodb").ObjectId;
const userModel = require("../models/userModel.js");


exports.getUsers = (request, response) => {
  userModel.findAllUser(response);
};

exports.getOneUser = (request, response) => {
  const userId = new ObjectId(request.params.id);
  userModel.findUser(response, { _id: userId, deleted: { $ne: true } });
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
