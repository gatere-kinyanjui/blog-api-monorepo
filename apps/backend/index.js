const express = require("express");
const path = require("path");
require("dotenv").config();

const authRouter = require("./routes/authRouter");
const homeRouter = require("./routes/homeRouter");
const dashboardRouter = require("./routes/dashboardRouter");

const passport = require("../backend/utils/passport-auth");

const cors = require("cors");
const authMiddleware = require("./middleware/authMiddleware");
const { getBlogPostsPage } = require("./controllers/blogPostController");

const expressServerApp = express();
const port = process.env.PORT || 8000;

// body parsers
expressServerApp.use(express.urlencoded({ extended: true }));
expressServerApp.use(express.json());

expressServerApp.use(passport.initialize());

expressServerApp.use(cors({ origin: "http://localhost:3000" }));

expressServerApp.use(express.static(path.join(__dirname, "public")));

// routes middleware
expressServerApp.use("/", homeRouter);
expressServerApp.use("/auth", authRouter);
expressServerApp.use("/dashboard", authMiddleware, dashboardRouter);
expressServerApp.use("/posts", getBlogPostsPage);

// expressServerApp.get("/", (req, res) => {
//   res.sendFile(path.resolve(__dirname))
// });

expressServerApp.listen(port, () => {
  console.log(`Blog API app listening on ${port}. Success!`);
});

// expressServerApp.get(
//   "/dashboard",
//   authMiddleware,
//   dashboardRouter
//   // (req, res) => {
//   // res.json({
//   //   message: "Protected route accessed successfully!",
//   //   user: req.user,
//   // })}
// );
