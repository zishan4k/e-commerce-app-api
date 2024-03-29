const CartModel = require('../models/CartModel');
const OrderModel = require('../models/OrderModel');
const CartItemModel = require('../models/CartItemModel');

const { STRIPE_SECRET_KEY } = require('../config');

module.exports = class CartService {
  async create(data) {
    const { userId } = data;

    try {
      const Cart = new CartModel();
      const cart = await Cart.create(userId);

      return cart;
    } catch (err) {
      throw err;
    }
  }

  async loadCart(userId) {
    try {
      // Load user cart based on ID
      const cart = await CartModel.findByUser(userId);

      // Load cart items and add them to the cart record
      const items = await CartItemModel.find(cart.id);
      cart.items = items;

      return cart;
    } catch (err) {
      throw err;
    }
  }

  async addItem(user_id, item) {
    try {
      const { product, quantity } = item;
      const product_id = product.id;

      // Load user cart based on ID
      const cart = await CartModel.findByUser(user_id);

      if (!cart) {
        return null;
      }

      // Add Item to cart
      const cartItem = await CartItemModel.create({
        cart_id: cart.id,
        product_id,
        quantity,
      });

      return cartItem;
    } catch (err) {
      throw err;
    }
  }

  async removeItem(cartItemId) {
    try {
      // Remove cart item by line ID
      const cartItem = await CartItemModel.delete(cartItemId);

      return cartItem;
    } catch (err) {
      throw err;
    }
  }

  async updateItem(cartItemId, data) {
    try {
      // Remove cart item by line ID
      const cartItem = await CartItemModel.update(cartItemId, data);

      return cartItem;
    } catch (err) {
      throw err;
    }
  }

  async checkout(cartId, userId, paymentInfo) {
    try {
      const stripe = require('stripe')(STRIPE_SECRET_KEY);

      // Load cart items
      const cartItems = await CartItemModel.find(cartId);

      // Generate total price from cart items
      const total = cartItems.reduce((total, item) => {
        return (total += Number(item.price));
      }, 0);

      // Generate initial order
      const Order = new OrderModel({ total, userId });
      Order.addItems(cartItems);
      await Order.create();

      // Make charge to payment method (not required in this project)
      await stripe.charges.create({
        amount: total,
        currency: 'gbp',
        source: paymentInfo.id,
        description: 'Codecademy Charge',
      });

      // On successful charge to payment method, update order status to COMPLETE
      const order = Order.update({ status: 'COMPLETE' });

      return order;
    } catch (err) {
      throw err;
    }
  }
};
