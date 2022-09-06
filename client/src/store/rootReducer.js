import { combineReducers } from 'redux';
import AuthReducers from './auth/Auth.reducers';
import CartReducers from './cart/Cart.reducers';
import OrdersReducers from './orders/Orders.reducers';
import ProductsReducers from './products/Products.reducers';
import UserReducers from './user/User.reducers';

export default combineReducers({
  auth: AuthReducers,
  products: ProductsReducers,
  cart: CartReducers,
  user: UserReducers,
  orders: OrdersReducers,
});
