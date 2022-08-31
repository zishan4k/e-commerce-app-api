import API from './client';

//logging in user
export const login = async (credentials) => {
  try {
    const response = await API.post('auth/login', credentials);

    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

//registering user
export const register = async (data) => {
  try {
    console.log('before response');
    const response = await API.post('auth/register', data);
    console.log('after response');

    return response.data;
  } catch (err) {
    console.log(err);
    throw err.response.data;
  }
};

//verifying login status of user
export const isLoggedIn = async () => {
  try {
    const response = await API.get('auth/logged_in');

    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};
