import API from './client';

// loading users orders
export const fetchOrders = async () => {
  try {
    const response = await API.get(`orders`);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

//loading user order by id
export const fetchOrder = async (orderId) => {
  try {
    const response = await API.get(`orders/${orderId}`);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};
