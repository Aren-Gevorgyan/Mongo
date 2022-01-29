const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/default");

const userSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  country: [String],
  deleted: { type: Boolean },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const user = mongoose.model("User", userSchema);

const generateAccessToken = (id) => {
  const payload = {
    id,
  };

  return jwt.sign(payload, secretKey, { expiresIn: "24h" });
};

exports.registration = (response, data) => {
  user.create(data, (err, res) => {
    if (err) {
      return response
        .send({ message: "This email already exist", err: err })
        .status(404);
    }
    response.json(res);
  });
};

exports.login = async (request, response) => {
  try {
    const { email, password } = request.body;

    const userData = await user.findOne({
      query: {
        email,
      },
    });

    if (!userData) {
      return response.status(400).json({ message: "Email don't  exist" });
    }

    const ifPassword = bcrypt.compareSync(password, userData.password);

    if (!ifPassword)
      return response.status(400).json({ message: "Password not found" });

    const myToken = generateAccessToken(userData._id);
    
    response.json({ token: myToken });

  } catch (err) {
    console.log(err, 'err')
    response.status(400);
  }
};

exports.findAllUser = (response) => {
  user.find({ deleted: { $ne: true } }, (err, res) => {
    response.json(res);
  });
};

exports.findUser = async (response, data) => {
  return await user.find(data).clone();
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
