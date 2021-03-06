const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/default");

const userSchema = new Schema({
  name: { type: String },
  age: { type: Number },
  country: [String],
  deleted: { type: Boolean },
  email: { type: String, unique: true },
  password: { type: String, },
});

const user = mongoose.model("User", userSchema);

const generateAccessToken = (id, name) => {
  const payload = {
    id,
    name
  };

  return jwt.sign(payload,  secretKey, {expiresIn : '1h'});
};

const findOneUser = async (response, data) => {
  return await user.findOne(data).clone();
};

const findAllUser = (response) => {
  user.find({ deleted: { $ne: true } }, (err, res) => {
    response.json(res);
  });
};

const registration = (response, data) => {
  user.create(data, (err, res) => {
    if (err) {
      return response
        .send({ message: "This email already exist", err: err })
        .status(404);
    }
    response.json(res);
  });
};

const login = async (request, response) => {
  try {
    const { email, password } = request.body;
  
    const userData = await findOneUser({
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

    const myToken = generateAccessToken(userData._id, userData.name);
    
    response.json({ token: myToken });

  } catch (err) {
    console.log(err, 'err')
    response.status(400);
  }
};

const upgradeUser = (response, id, data) => {
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

const deleteUser = (response, id) => {
  const getId = new ObjectId(id);

  user.findOneAndUpdate({ _id: getId }, { deleted: true }, (err, res) => {
    if (err) return console.log(err);
    response.json(res);
  });
};

module.exports = {
  findAllUser,
  findOneUser,
  registration,
  login,
  upgradeUser,
  deleteUser,
}
