const express = require('express');
const router = express.Router();
const CartService = require('../services/CartService');

const CartServiceInstance = new CartService();

module.exports = (app, passport) => {
  app.use('/api/carts', router);

  router.get('/mycart', async (req, res, next) => {
    try {
      const { id } = req.user;

      const response = await CartServiceInstance.loadCart(id);

      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.put('/mycart', async (req, res, next) => {
    try {
      const { id } = req.user;

      const response = await CartServiceInstance.get({ id });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.post('/mycart', async (req, res, next) => {
    try {
      const { id } = req.user;

      const response = await CartServiceInstance.create({ userId: id });

      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.post('/mycart/items', async (req, res, next) => {
    try {
      console.log(req.body);
      const { user, ...data } = req.body;
      const { id } = user;
      let response = await CartServiceInstance.addItem(id, data);
      if (!response) {
        await CartServiceInstance.create({ userId: id });
        response = await CartServiceInstance.addItem(id, data);
        return response;
      }
      res.status(200).send(response);

      console.log('successfully added new item to cart');
    } catch (err) {
      next(err);
    }
  });

  router.put('/mycart/items/:cartItemId', async (req, res, next) => {
    try {
      const { cartItemId } = req.params;
      const data = req.body;

      const response = await CartServiceInstance.updateItem(cartItemId, data);

      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.delete('/mycart/items/:cartItemId', async (req, res, next) => {
    try {
      const { cartItemId } = req.params;

      const response = await CartServiceInstance.removeItem(cartItemId);

      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.post('/mycart/checkout', async (req, res, next) => {
    try {
      const { id } = req.user;

      const { cartId, paymentInfo } = req.body;

      const response = await CartServiceInstance.checkout(
        cartId,
        id,
        paymentInfo
      );

      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });
};
