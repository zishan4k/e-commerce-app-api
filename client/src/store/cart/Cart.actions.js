import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addToCart,
  checkout,
  fetchCart,
  removeFromCart,
} from '../../apis/cart';

export const addItem = createAsyncThunk(
  'cart/addItem',
  async ({ product, quantity }, thunkAPI) => {
    try {
      const response = await addToCart(product.id, quantity);
      const item = {
        ...product,
        cartItemId: response.id,
        quantity,
      };
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
  'cart/loadCart',
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
  'cart/removeItem',
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
