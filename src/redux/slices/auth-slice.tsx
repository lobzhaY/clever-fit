import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userEmail: '',
  userToken: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addAuthData: (state, action) => {
      state.userEmail = action.payload.userEmail;
      state.userToken = action.payload.userToken;
    },
    removeAuthData: (state) => {
      state.userEmail = '';
      state.userToken = '';
    },
  },
});

export const { addAuthData, removeAuthData } = authSlice.actions;

export default authSlice.reducer;
