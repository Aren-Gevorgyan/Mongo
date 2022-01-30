const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/default");

exports.authMiddleware = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) return res.status(403).json({ message: " Authentication failed! " });
    console.log(token, 1111111111111)
    const userData = jwt.verify(token, secretKey);

    console.log(userData);
    req.data.user = userData;

    next();
  } catch (e) {
    console.log(e, "authorization");
    return res.status(403).json({ message: " Invalid token " });
  }
};
