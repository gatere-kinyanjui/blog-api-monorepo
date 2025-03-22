const express = require("express");
const { getBlogPostsPage } = require("../controllers/blogPostController");

const blogPostsRouter = express.Router();

blogPostsRouter.get("/", getBlogPostsPage);
