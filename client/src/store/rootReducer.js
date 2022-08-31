import { combineReducers } from '@reduxjs/toolkit';
import AuthReducers from './auth/Auth.reducers';
import ProductsReducers from './products/Products.reducers';

export default combineReducers({
  auth: AuthReducers,
  products: ProductsReducers,
});
