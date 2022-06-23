const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");

module.exports = (app) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.set("trust proxy", 1);
  app.use(
    session({
      secret: "session-secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  );
  return app;
};
