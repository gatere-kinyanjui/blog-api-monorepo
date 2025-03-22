const express = require("express");
const path = require("path");
require("dotenv").config();

const authRouter = require("./routes/authRouter");
const homeRouter = require("./routes/homeRouter");
const dashboardRouter = require("./routes/dashboardRouter");

const passport = require("../backend/utils/passport-auth");

// const passport = require("passport");

const cors = require("cors");
const authMiddleware = require("./middleware/authMiddleware");
const { getBlogPostsPage } = require("./controllers/blogPostController");

const blogApp = express();
const port = process.env.PORT;

// body parsers
blogApp.use(express.urlencoded({ extended: true }));
blogApp.use(express.json());

blogApp.use(passport.initialize());

// blogApp.use(cors());

blogApp.use(express.static(path.join(__dirname, "public")));

// routes middleware
blogApp.use("/", homeRouter);
blogApp.use("/auth", authRouter);
blogApp.use("/dashboard", authMiddleware, dashboardRouter);
blogApp.use("/posts", authMiddleware, getBlogPostsPage);

// blogApp.get(
//   "/dashboard",
//   authMiddleware,
//   dashboardRouter
//   // (req, res) => {
//   // res.json({
//   //   message: "Protected route accessed successfully!",
//   //   user: req.user,
//   // })}
// );

blogApp.listen(port, () => {
  console.log(`Blog API app listening on ${port}. Success!`);
});
