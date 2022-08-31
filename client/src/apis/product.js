import API from './client';

//API for loading products
export const fetchProducts = async () => {
  try {
    const response = await API.get(`products`);

    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

//API for loading product by id
export const fetchProduct = async (productId) => {
  try {
    const response = await API.get(`products/${productId}`);

    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};
