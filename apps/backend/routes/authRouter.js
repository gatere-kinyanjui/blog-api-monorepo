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

/* // TODO: PROTECTED ROUTE FIX
authRouter.get(
  "/protected-route",
  passport.authenticate("jwt", { session: false }),
  getDashboardRoute
); */

authRouter.get("/protected", function (req, res, next) {
  passport.authenticate("local", function (err, user, info, status) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/signin");
    }
    res.redirect("/account");
  })(req, res, next);
});

module.exports = authRouter;
