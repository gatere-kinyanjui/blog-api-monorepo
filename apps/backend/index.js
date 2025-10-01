const express = require("express");
const path = require("path");
require("dotenv").config();

const authRouter = require("./routes/authRouter");
const homeRouter = require("./routes/homeRouter");
const dashboardRouter = require("./routes/dashboardRouter");
const blogPostsRouter = require("./routes/blogPostsRouter");

const passport = require("../backend/utils/passport/passport-auth");

const authMiddleware = require("./middleware/authMiddleware");

const expressServerApp = express();
const port = process.env.PORT || 8000;

const cors = require("cors");

const corsOption = { origin: ["http://localhost:5173"] }; // author app vite local port

// body parsers
expressServerApp.use(express.urlencoded({ extended: true }));
expressServerApp.use(express.json());

expressServerApp.use(passport.initialize());

expressServerApp.use(cors(corsOption));

expressServerApp.use(express.static(path.join(__dirname, "public")));

// routes middleware
expressServerApp.use("/", homeRouter);
expressServerApp.use("/auth", authRouter);
expressServerApp.use("/dashboard", authMiddleware, dashboardRouter);
expressServerApp.use("/posts", blogPostsRouter);

// expressServerApp.get("/", (req, res) => {
//   res.sendFile(path.resolve(__dirname))
// });

expressServerApp.listen(port, () => {
  console.log(`Blog API app listening on ${port}. Success!`);
});

// function verifyToken(req, res, next) {}

/* // TODO: IMPLEMENT DASHBOARD/PROTECTED ROUTE
expressServerApp.get(
  "/dashboard",
  authMiddleware,
  dashboardRouter,
  (req, res) => {
    res.json({
      message: "Protected route accessed successfully!",
      user: req.user,
    });
  }
); */
