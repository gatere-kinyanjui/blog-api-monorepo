const passport = require("../utils/passport-auth");

const authMiddleware = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
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

module.exports = authMiddleware;
