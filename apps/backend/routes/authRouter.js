const express = require("express");
const {
  getLoginPage,
  postLogin,
  getProtectedRoute,
  postRegister,
} = require("../controllers/authController");
const passport = require("passport");

const authRouter = express.Router();

authRouter.get("/", getLoginPage);

authRouter.post("/register", postRegister);

authRouter.post("/login", postLogin);

// authRouter.get(
//   "/protected-route",
//   passport.authenticate("jwt", { session: false }),
//   getProtectedRoute
// );

module.exports = authRouter;
