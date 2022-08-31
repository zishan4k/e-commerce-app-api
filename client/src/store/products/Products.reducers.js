import { createSlice } from '@reduxjs/toolkit';
import { loadProduct, loadProducts } from './Products.actions';

const initialState = {};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProduct.fulfilled, (state, action) => {
        const { product } = action.payload;
        state[product.id] = product;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        const { products } = action.payload;
        products.forEach((product) => {
          const { id } = product;
          state[id] = product;
        });
      });
  },
});

export default productsSlice.reducer;
