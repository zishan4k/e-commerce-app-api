import { combineReducers } from 'redux';
import AuthReducers from './auth/Auth.reducers';
import CartsReducers from './carts/Carts.reducers';
import OrdersReducers from './orders/Orders.reducers';
import ProductsReducers from './products/Products.reducers';
import UsersReducers from './user/Users.reducers';

export default combineReducers({
  auth: AuthReducers,
  products: ProductsReducers,
  carts: CartsReducers,
  users: UsersReducers,
  orders: OrdersReducers,
});
