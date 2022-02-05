const express = require("express");
const postRouter = express.Router();
const jsonParser = express.json();
const postControllers = require("../controllers/postControllers");
const authMiddleware = require("../middleware/authMiddleware");
const onlyAuthor = require("../middleware/onlyAuthor");

postRouter.post(
  "/create",
  [jsonParser, authMiddleware],
  postControllers.createPost
);
postRouter.put(
  ":id",
  [jsonParser, authMiddleware, onlyAuthor],
  postControllers.upgradePost
);
postRouter.delete(
  ":id",
  [authMiddleware, onlyAuthor],
  postControllers.deletePost
);
postRouter.get("/", postControllers.getPosts);

module.exports = postRouter;
