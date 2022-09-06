import { createSlice } from '@reduxjs/toolkit';
import { checkoutCart } from '../cart/Cart.actions';
import { loadOrder, loadOrders } from './Orders.actions';

const initialState = {};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //add order after successful checkout
      .addCase(checkoutCart.fulfilled, (state, action) => {
        const { order } = action.payload;
        state[order.id] = order;
      })
      //load order by id upon success
      .addCase(loadOrder.fulfilled, (state, action) => {
        const { order } = action.payload;
        state[order.id] = order;
      })
      //load list of orders upon success
      .addCase(loadOrders.fulfilled, (state, action) => {
        const { orders } = action.payload;
        orders.forEach((order) => {
          const { id } = order;
          state[id] = order;
        });
      });
  },
});

export default ordersSlice.reducer;
