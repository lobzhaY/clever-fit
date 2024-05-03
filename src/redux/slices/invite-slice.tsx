import { createSlice } from '@reduxjs/toolkit';

import { GetInvite, GetUserJointList, TrainingStatus } from '../../constants/api/api-types';

const initialState = {
  myInvites: [],
  newInvites: [],
  pendingInvites: [],
  jointInvites: [],
  jointUsers: [],
  searchJointUsers: [],
  palsList: [],
  countInvites: 0,
};

const inviteSlice = createSlice({
  name: 'invite',
  initialState,
  reducers: {
    addMyInvite: (state, action) => {
      state.myInvites = action.payload.myInvite;

      const myInvites = action.payload.myInvite;
      const newInvites = myInvites.filter(
        (elem: GetInvite) => elem.status === TrainingStatus.Pending
      );
      const jointInvites = myInvites.filter(
        (elem: GetInvite) => elem.status === TrainingStatus.Accepted
      );

      state.newInvites = newInvites;
      state.jointInvites = jointInvites;
      state.countInvites = newInvites.length;
    },
    updateInvite: (state, action) => {
      if (action.payload.typeInvite === TrainingStatus.Pending) {
        state.pendingInvites = action.payload.invitesData;
      }
    },
    addJointUsers: (state, action) => {
      state.jointUsers = action.payload.jointUsersList;
    },
    updateJointUsers: (state, action) => {
      const jointUsersList = state.jointUsers;

      if (state.searchJointUsers.length > 0) {
        const searchJointUsersList = state.searchJointUsers;
        searchJointUsersList.forEach((elem: GetUserJointList) => {
          if (elem.id === action.payload.userId) {
            elem.status = TrainingStatus.Pending;
          }
          return elem;
        });
      }

      jointUsersList.forEach((elem: GetUserJointList) => {
        if (elem.id === action.payload.userId) {
          elem.status = TrainingStatus.Pending;
        }
        return elem;
      });
    },
    addSearchJointUsers: (state, action) => {
      state.searchJointUsers = action.payload.searchUserActionList;
    },
    addPalsList: (state, action) => {
      state.palsList = action.payload.palsList;
    },
    updatePalsList: (state, action) => {
      const myInvites = state.myInvites.filter(
        (elem: GetInvite) => elem._id !== action.payload.inviteId
      );
      const newInvites = myInvites.filter(
        (elem: GetInvite) => elem.status === TrainingStatus.Pending
      );

      state.myInvites = myInvites;
      state.newInvites = newInvites;
      state.countInvites = newInvites.length;
    },
  },
});

export const {
  addMyInvite,
  updateInvite,
  addJointUsers,
  updateJointUsers,
  addSearchJointUsers,
  addPalsList,
  updatePalsList,
} = inviteSlice.actions;

export default inviteSlice.reducer;
