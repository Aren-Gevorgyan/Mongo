const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/default");

const authMiddleware = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) return res.status(403).json({ message: " Authentication failed! " });
    const userData = jwt.verify(token, secretKey);

    req.data = userData;

    next();
  } catch (e) {
    console.log(e, "authorization");
    return res.status(403).json({ message: " Invalid token " });
  }
};

module.exports = authMiddleware;
