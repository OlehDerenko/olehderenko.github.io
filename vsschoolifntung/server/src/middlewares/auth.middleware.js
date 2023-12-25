const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const usersService = require("../services/users.service");

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    const [user] = await usersService.getUserById(payload.id);

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
);

const authMiddleware = passport.authenticate("jwt", { session: false });

module.exports = authMiddleware;
