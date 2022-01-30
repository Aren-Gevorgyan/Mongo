const express = require("express");
const jsonParser = express.json();
const userRouter = express.Router();
const userControllers = require("../controllers/userControllers.js");
const { authMiddleware } = require("../middleware/authMiddleware");
const { check } = require("express-validator");

userRouter.post(
  "/registration",
  [
    jsonParser,
    check("email", "Email should not be empty").notEmpty(),
    check(
      "password",
      "Password should not be empty, and min length 4, max length 12"
    ).isLength({ min: 4, max: 12 }),
  ],
  userControllers.registration
);
userRouter.use("/login", jsonParser, userControllers.login);

userRouter.get("/:id", userControllers.getOneUser);
userRouter.delete("/:id", userControllers.deleteUser);
userRouter.put("/:id", jsonParser, userControllers.upgradeUser);
userRouter.get("/", authMiddleware, userControllers.getUsers);

module.exports = userRouter;
