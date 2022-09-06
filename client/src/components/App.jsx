import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Account from '../routes/Account/Account';
import Cart from '../routes/Cart/Cart';
import Checkout from '../routes/Checkout/Checkout';
import Home from '../routes/Home/Home';
import Login from '../routes/Login/Login';
import OrderDetails from '../routes/OrderDetails/OrderDetails';
import Orders from '../routes/Orders/Orders';
import ProductDetails from '../routes/ProductDetails/ProductDetails';
import Register from '../routes/Register/Register';

import Header from './Header/Header';
import PrivateRoute from './PrivateRoute/PrivateRoute';

import { checkLoginStatus } from '../store/auth/Auth.actions';

const App = () => {
  const dispatch = useDispatch();

  //load user cart on login
  useEffect(() => {
    const isLoggedIn = async () => {
      await dispatch(checkLoginStatus());
    };

    isLoggedIn();
  }, [dispatch]);
  return (
    <div style={{ flex: 1 }}>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route exact path="/" element={<Home />} />
          {/* ProductListing after login */}
          <Route path="/login" element={<Login />} />
          {/* current + third party login + session support + logout functionality */}
          <Route path="/products/:productId" element={<ProductDetails />} />
          {/* ProductDetails after ProductListing */}
          <Route path="/register" element={<Register />} />
          {/* needs styling */}
          <Route path="/orders" element={<Orders />} />
          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route exact path="/account" element={<Account />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/checkout" element={<Checkout />} />
            <Route exact path="/orders" element={<Orders />} />
            <Route exact path="/orders/:orderId" element={<OrderDetails />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
