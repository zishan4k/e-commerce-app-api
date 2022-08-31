const express = require('express');
const AuthService = require('../services/AuthService');
const CartService = require('../services/CartService');
const UserService = require('../services/UsersService');

const router = express.Router();
const AuthServiceInstance = new AuthService();
const CartServiceInstance = new CartService();
const UserServiceInstance = new UserService();

module.exports = (app, passport) => {
  app.use('/auth', router);

  // Register
  router.post('/register', async (req, res, next) => {
    try {
      const { data } = req.body;

      const response = await AuthServiceInstance.register(data);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  // Login
  router.post(
    '/login',
    passport.authenticate('local'),
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

  //Google login endpoint
  router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile'] })
  );

  //Google login callback
  router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    async (req, res) => {
      res.redirect('/');
    }
  );

  //facebook endpoint
  router.get('/facebook', passport.authenticate('facebook'));

  //facebook login callback
  router.get(
    '/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    async (req, res) => {
      res.redirect('/');
    }
  );

  //Login status
  router.get('/logged_in', async (req, res, next) => {
    try {
      const { id } = req.user;

      const cart = await CartServiceInstance.loadCart(id);
      const user = await UserServiceInstance.get({ id });

      res.status(200).send({
        cart,
        loggedIn: true,
        user,
      });
    } catch (err) {
      next(err);
    }
  });
};
