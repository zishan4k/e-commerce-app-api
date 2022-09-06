import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadOrders } from '../../store/orders/Orders.actions';
import OrderCard from '../../components/OrderCard/OrderCard';
import { Typography, Divider } from '@mui/material';
import './Orders.css';

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  useEffect(() => {
    async function load() {
      await dispatch(loadOrders());
    }
    load();
  }, [dispatch]);

  return (
    <div className="orders-page">
      <div className="orders-content-container">
        <Typography variant="h4">Your Orders</Typography>
        <Divider />
        <Typography variant="h6">
          {Object.keys(orders).length || 0} orders
        </Typography>
        {orders &&
          Object.keys(orders).map((key) => {
            const order = orders[key];
            return <OrderCard {...order} key={order.id} />;
          })}
      </div>
    </div>
  );
};

export default Orders;
