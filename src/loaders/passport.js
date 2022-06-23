const passport = require("passport");
const LocalStrategy = require("passport-local");

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    done(null, { id });

    passport.use(
      new LocalStrategy(async (username, password, done) => {
        try {
          // Add try block login
        } catch (err) {
          return done(err);
        }
      })
    );
  });

  return passport;
};
