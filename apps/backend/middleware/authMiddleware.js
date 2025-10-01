import passport from "../utils/passport/passport-auth.js";

const authMiddleware = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    console.log("ERROR:", err);
    console.log("USER:", user);
    console.log("INFO:", info);

    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized!",
        error: info ? info.message : "No user found.",
      });
    }

    req.user = user; // attach user to req object
    next();
  })(req, res, next);
};

export default authMiddleware;
