import passport from "passport";
import path from "path";

import prismaClientInstance from "../../orm-services/prismaClientInstance.js";

import { Strategy as JwtStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";

import { compareSync } from "bcrypt";

import "dotenv/config";

// passport.use(JwtStrategy);

// CONFIGURE AND RETRIEVE PUBLIC KEYPAIR FOR ENCRYPTING JWT TOKEN
// const pathToKey = path.join(__dirname, "..", "id_rsa_pub.pem");
// const PUB_KEY = fs.readFileSync(pathToKey, "utf-8");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  algorithms: ["HS256"],
};

passport.use(
  new JwtStrategy(options, async (jwt_payload, done) => {
    try {
      const userToLogin = await prismaClientInstance.user.findUnique({
        where: { id: jwt_payload.id },
      });

      if (userToLogin) {
        return done(null, userToLogin);
      }
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
);

/* passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    function (email, password, cb) {
      const userLoginResult = prismaClientInstance.user.findUnique({
        where: {
          email: { email },
        },
      });

      if (err) {
        console.error("[PASSPORT-AUTH ERROR]:", err.message);
        return cb(err);
      }

      if (!userLoginResult) {
        return done(null, false, { message: "Invalid login credentials" });
      }

      const hashPassword = compareSync(password, userLoginResult.password);

      if (err) {
        console.error("[PASSPORT-AUTH ERROR]:", err.message);
        return cb(err);
      }

      if (!hashPassword) {
        return done(null, false, { message: "Invalid login credentials" });
      }

      return don(null, userLoginResult);
    }
  )
); */

export default passport;
