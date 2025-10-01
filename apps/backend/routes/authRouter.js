import express from "express";

import {
  getLoginPage,
  postLogin,
  postRegister,
} from "../controllers/authController.js";

import passport from "passport";
import getDashboardRoute from "../controllers/dashboardController.js";

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

export default authRouter;
