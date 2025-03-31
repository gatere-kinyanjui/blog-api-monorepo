const passport = require("passport");
const path = require("path");
const {
  prismaClientInstance,
} = require("../orm-services/prismaClientInstance");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

require("dotenv").config();

passport.use(JwtStrategy);

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

module.exports = passport;
