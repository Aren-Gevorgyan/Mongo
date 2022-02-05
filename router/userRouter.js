const express = require("express");
const jsonParser = express.json();
const userRouter = express.Router();
const userControllers = require("../controllers/userControllers.js");
const authMiddleware = require("../middleware/authMiddleware");
const onlyAuthor = require("../middleware/onlyAuthor");

userRouter.get("/:id", userControllers.getOneUser);
userRouter.delete("/:id", [authMiddleware, onlyAuthor], userControllers.deleteUser);
userRouter.put("/:id", [jsonParser, authMiddleware, onlyAuthor], userControllers.upgradeUser);
userRouter.get("/", userControllers.getUsers);

module.exports = userRouter;
