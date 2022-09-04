import API from './client';

//logging in user
export const login = async (credentials) => {
  try {
    console.log('logging in');
    const response = await API.post('auth/login', credentials);
    console.log('logged in');
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

//registering user
export const register = async (data) => {
  try {
    console.log('before response');
    console.log(data);
    const response = await API.post('auth/register', data);
    console.log('after response');

    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

//verifying login status of user
export const isLoggedIn = async () => {
  try {
    console.log('check response');
    const response = await API.get('auth/logged_in');
    console.log('response checked');

    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};
