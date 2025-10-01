import { Router } from "express";
// const authMiddleware = require("../middleware/authMiddleware");
import {
  getBlogPostsPage,
  postBlogPostPage,
} from "../controllers/blogPostController.js";

const blogPostsRouter = Router();

blogPostsRouter.get("/", getBlogPostsPage);

blogPostsRouter.post("/", postBlogPostPage);

export default blogPostsRouter;
