import { createSlice } from '@reduxjs/toolkit';

import { GetCurrentUserType } from '../../constants/api/api-types';

const initialState: GetCurrentUserType = {
  email: '',
  firstName: '',
  lastName: '',
  birthday: '',
  imgSrc: '',
  readyForJointTraining: false,
  sendNotification: false,
  tariff: {
    tariffId: '',
    expired: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserData: (state, action) => {
      const {
        email,
        firstName,
        lastName,
        birthday,
        imgSrc,
        readyForJointTraining,
        sendNotification,
        tariff,
      } = action.payload.currentUser;
      state.email = email;
      state.firstName = firstName;
      state.lastName = lastName;
      state.birthday = birthday;
      state.imgSrc = imgSrc;
      state.readyForJointTraining = readyForJointTraining;
      state.sendNotification = sendNotification;
      if (tariff) {
        state.tariff.tariffId = tariff.tariffId;
        state.tariff.expired = tariff.expired;
      }
    },
  },
});

export const { addUserData } = userSlice.actions;

export default userSlice.reducer;
