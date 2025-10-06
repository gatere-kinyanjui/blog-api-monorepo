import passport from "../utils/passport/passport-auth.js";

const authMiddleware = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    console.log("[AUTH MIDDLEWARE] ERROR:", err);
    console.log("[AUTH MIDDLEWARE] USER:", user);
    console.log("[AUTH MIDDLEWARE] INFO:", info);

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
