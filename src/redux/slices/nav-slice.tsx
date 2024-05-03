import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  typeNav: '',
};

const navSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    addNavData: (state, action) => {
      state.typeNav = action.payload.typeNav;
    },
    removeNavData: (state) => {
      state.typeNav = '';
    },
  },
});

export const { addNavData, removeNavData } = navSlice.actions;

export default navSlice.reducer;
