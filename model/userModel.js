const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = require("mongodb").ObjectId;

const userSchema = new Schema({
  name: { type: String },
  age: { type: Number },
  country: [String],
  deleted: { type: Boolean },
});

const user = mongoose.model("User", userSchema);

exports.findAllUser = (response) => {
  user.find({ deleted: { $ne: true } }, (err, res) => {
    response.json(res);
  });
};

exports.findUserById = (response, id) => {
  const userId = new ObjectId(id);
  user.find({ _id: userId, deleted: { $ne: true } }, (err, res) => {
    response.json(res);
  });
};

exports.createUser = (response, data) => {
  user.create(data, (err, res) => {
    if (err) return console.log(err);
    response.json(res);
  });
};

exports.upgradeUser = (response, id, data) => {
  const upgradeId = new ObjectId(id);

  user.findOneAndUpdate(
    { _id: upgradeId },
    {
      $set: data,
    },
    (err, res) => {
      if (err) return console.log(err);
      response.json(res);
    }
  );
};

exports.deleteUser = (response, id) => {
  const getId = new ObjectId(id);

  user.findOneAndUpdate({ _id: getId }, { deleted: true }, (err, res) => {
    if (err) return console.log(err);
    response.json(res);
  });
};
