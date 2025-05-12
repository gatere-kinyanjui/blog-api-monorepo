const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getBlogPostsPage } =
  require("../controllers/blogPostController").default;

const blogPostsRouter = express.Router();

blogPostsRouter.get("/", getBlogPostsPage);
