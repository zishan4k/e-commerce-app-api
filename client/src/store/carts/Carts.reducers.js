import { createSlice } from '@reduxjs/toolkit';
import { checkLoginStatus } from '../auth/Auth.actions';
import { addItem, checkoutCart, loadCart, removeItem } from './Carts.actions';

const initialState = { items: [] };

const cartsSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addItem.fulfilled, (state, action) => {
        const { item } = action.payload;
        state.items.push(item);
      })
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        const { cart } = action.payload;
        Object.assign(state, cart);
      })
      .addCase(checkoutCart.fulfilled, (state, action) => {})
      .addCase(loadCart.fulfilled, (state, action) => {
        const { cart } = action.payload;
        Object.assign(state, cart);
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        const { item } = action.payload;
        state.items = state.items.filter(
          (product) => product.cartItemId !== item
        );
      });
  },
});

export default cartsSlice.reducer;
