import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tariffList: [],
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    addTariffList: (state, action) => {
      state.tariffList = action.payload.tariffList;
    },
  },
});

export const { addTariffList } = settingsSlice.actions;

export default settingsSlice.reducer;
