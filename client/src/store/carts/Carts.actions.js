import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addToCart,
  checkout,
  fetchCart,
  removeFromCart,
} from '../../apis/carts';

export const addItem = createAsyncThunk(
  'carts/addItem',
  async ({ product, quantity, user }, thunkAPI) => {
    try {
      console.log('before cart.action response');
      const response = await addToCart(product, quantity, user);
      console.log('after cart.action response');
      const item = {
        ...product,
        cartItemId: response.id,
        quantity,
      };
      console.log(item);
      return { item };
    } catch (err) {
      throw err;
    }
  }
);

export const checkoutCart = createAsyncThunk(
  'carts/checkoutCart',
  async ({ cartId, paymentInfo }, thunkAPI) => {
    try {
      const response = await checkout(cartId, paymentInfo);
      return {
        order: response,
      };
    } catch (err) {
      throw err;
    }
  }
);

export const loadCart = createAsyncThunk(
  'carts/loadCart',
  async (params, thunkAPI) => {
    try {
      const response = await fetchCart();
      return {
        cart: response,
      };
    } catch (err) {
      throw err;
    }
  }
);

export const removeItem = createAsyncThunk(
  'carts/removeItem',
  async (cartItemId, thunkAPI) => {
    try {
      await removeFromCart(cartItemId);
      return {
        item: cartItemId,
      };
    } catch (err) {
      throw err;
    }
  }
);
