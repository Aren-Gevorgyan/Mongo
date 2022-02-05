const ObjectId = require("mongodb").ObjectId;
const postModel = require("../models/postModel");
const userModel = require("../models/userModel");

exports.createPost = (req, res) => {
  if (!request.body) return response.sendStatus("404", "Not found");

  const { content, subTitle } = req.body;

  const { id } = req.data;

  const user = userModel.findOneUser(res, { _id: ObjectId(id) });

  const data = {
    user,
    subTitle,
    content,
    createAt: new Date('')
  };

  postModel.createPost(data);
};

exports.upgradePost = (req, res) => {};

exports.deletePost = (req, res) => {};

exports.getPosts = (req, res) => {};
