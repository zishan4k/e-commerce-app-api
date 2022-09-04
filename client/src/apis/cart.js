import { response } from 'express';
import API from './client';

//loading users cart
export const fetchCart = async () => {
  try {
    const response = await API.get(`carts/mine`);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

//adding product to users cart
export const addToCart = async (productId, quantity) => {
  try {
    const response = await API.post(`carts/mine/items`, {
      productId,
      quantity,
    });
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

//removing product fom users cart
export const removeFromCart = async (cartItemId) => {
  try {
    const response = await API.delete(`carts/mine/items/${cartItemId}`);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

//checkout users cart
export const checkout = async (cartId, paymentInfo) => {
  try {
    const response = await API.post(`carts/mine/checkout`, {
      cartId,
      paymentInfo,
    });
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};
