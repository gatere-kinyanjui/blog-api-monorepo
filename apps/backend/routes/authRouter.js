const express = require("express");

const {
  getLoginPage,
  postLogin,
  postRegister,
} = require("../controllers/authController");

const passport = require("passport");
const { getDashboardRoute } = require("../controllers/dashboardController");

const authRouter = express.Router();

authRouter.get("/", getLoginPage);
authRouter.post("/register", postRegister);
authRouter.post("/login", postLogin);

/* TODO: PROTECTED ROUTE FIX
authRouter.get(
  "/protected-route",
  passport.authenticate("jwt", { session: false }),
  getDashboardRoute
); */

module.exports = authRouter;
