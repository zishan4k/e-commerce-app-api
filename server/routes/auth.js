const express = require("express");
const AuthService = require("../services/auth");

const router = express.Router();
const AuthServiceInstance = new AuthService();

module.exports = (app, passport) => {
  app.use("/auth", router);

  // Register
  router.post("/register", async (req, res, next) => {
    try {
      const data = req.body;

      const response = await AuthServiceInstance.register(data);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  // Login
  router.post(
    "/login",
    passport.authenticate("local"),
    async (req, res, next) => {
      try {
        const { username, password } = req.body;

        const response = await AuthServiceInstance.login({
          email: username,
          password,
        });

        res.status(200).send(response);
      } catch (err) {
        next(err);
      }
    }
  );
};
