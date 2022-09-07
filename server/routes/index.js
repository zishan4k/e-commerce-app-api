const authRouter = require('./auth');
const productsRouter = require('./products');
const usersRouter = require('./users');
const cartRouter = require('./carts');

module.exports = (app, passport) => {
  authRouter(app, passport);
  productsRouter(app);
  usersRouter(app);
  cartRouter(app);
};
