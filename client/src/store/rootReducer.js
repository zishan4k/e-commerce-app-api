import { combineReducers } from '@reduxjs/toolkit';
import AuthReducers from './auth/Auth.reducers';
import CartReducers from './cart/Cart.reducers';
import ProductsReducers from './products/Products.reducers';
import UserReducers from './user/User.reducers';

export default combineReducers({
  auth: AuthReducers,
  products: ProductsReducers,
  cart: CartReducers,
  user: UserReducers,
});
