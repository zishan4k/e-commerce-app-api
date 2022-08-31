const passport = require("passport");
const LocalStrategy = require("passport-local");
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const AuthService = require("../services/AuthService");

const AuthServiceInstance = new AuthService();

const { FACEBOOK, GOOGLE } = require("../config");

module.exports = (app) => {
  //initialize passport
  app.use(passport.initialize());
  app.use(passport.session());

  //serialize data store in cookie
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  //deserialize data stored in cookie
  passport.deserializeUser((id, done) => {
    done(null, { id });
  });

  //local login strategy
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await AuthServiceInstance.login({
          email: username,
          password,
        });
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  //google login strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE.CONSUMER_KEY,
        clientSecret: GOOGLE.CONSUMER_SECRET,
        callbackURL: GOOGLE.CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await AuthServiceInstance.googleLogin(profile);
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  //facebook login strategy
  passport.use(
    new FacebookStrategy(
      {
        clientID: FACEBOOK.CONSUMER_KEY,
        clientSecret: FACEBOOK.CONSUMER_SECRET,
        callbackURL: FACEBOOK.CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await AuthServiceInstance.facebookLogin(profile);
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  return passport;
};
