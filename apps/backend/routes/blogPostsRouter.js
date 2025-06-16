const express = require("express");
// const authMiddleware = require("../middleware/authMiddleware");
const {
  getBlogPostsPage,
  postBlogPostPage,
} = require("../controllers/blogPostController");

const blogPostsRouter = express.Router();

blogPostsRouter.get("/", getBlogPostsPage);

blogPostsRouter.post("/", postBlogPostPage);

module.exports = blogPostsRouter;
