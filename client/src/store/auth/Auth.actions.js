import { createAsyncThunk } from '@reduxjs/toolkit';
import { isLoggedIn, login, register } from '../../apis/auth';

export const checkLoginStatus = createAsyncThunk(
  'auth/checkLogin',
  async (param, thunkAPI) => {
    try {
      if (!param) {
        return {
          isAuthenticated: false,
        };
      }
      const response = await isLoggedIn();
      console.log(response);
      return {
        cart: response.cart,
        isAuthenticated: true,
        user: response.user,
      };
    } catch (err) {
      throw err;
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
      console.log('before auth.action response');
      const response = await login(credentials);
      console.log('after auth.action response');
      console.log(response);
      return {
        user: response,
        isAuthenticated: true,
      };
    } catch (err) {
      throw err;
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (credentials, thunkAPI) => {
    try {
      console.log('before registering');
      await register(credentials);
      console.log('after registering');
      return {};
    } catch (err) {
      throw err;
    }
  }
);
