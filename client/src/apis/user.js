import API from './client';

//loading users profile
export const fetchUser = async (userId) => {
  try {
    const response = await API.get(`users/${userId}`);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

//updating users profile

export const updateUser = async (userId) => {
  try {
    const response = await API.put(`users/${userId}`, data);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};
