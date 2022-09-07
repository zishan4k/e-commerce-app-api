import { createSlice } from '@reduxjs/toolkit';
import { checkLoginStatus, loginUser, registerUser } from './Auth.actions';

const initialState = {
  isFetching: false,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //login status success
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        const { isAuthenticated } = action.payload;
        state.isAuthenticated = isAuthenticated;
      })
      //login success
      .addCase(loginUser.fulfilled, (state, action) => {
        const { isAuthenticated } = action.payload;
        state.isAuthenticated = isAuthenticated;
      })
      //login error
      .addCase(loginUser.rejected, (state, action) => {
        const { error } = action.payload;
        state.isAuthenticated = false;
        state.error = error;
      })
      //register success
      .addCase(registerUser.fulfilled, (state, action) => {
        const { isAuthenticated } = action.payload;
        state.isAuthenticated = isAuthenticated;
      })
      //register failure
      .addCase(registerUser.rejected, (state, action) => {
        const { error } = action.payload;
        state.isAuthenticated = false;
        state.error = error;
      });
  },
});

export default authSlice.reducer;
