import API from './client';

//loading users cart
export const fetchCart = async () => {
  try {
    const response = await API.get(`carts/mycart`);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

//adding product to users cart
export const addToCart = async (product, quantity, user) => {
  try {
    const response = await API.post(`carts/mycart/items`, {
      product,
      quantity,
      user,
    });
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

//removing product fom users cart
export const removeFromCart = async (cartItemId) => {
  try {
    const response = await API.delete(`carts/mycart/items/${cartItemId}`);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

//checkout users cart
export const checkout = async (cartId, paymentInfo) => {
  try {
    const response = await API.post(`carts/mycart/checkout`, {
      cartId,
      paymentInfo,
    });
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};
