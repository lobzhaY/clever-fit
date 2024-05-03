import { createSlice } from '@reduxjs/toolkit';

import dayjs from 'dayjs';

import { DrawerType, GetUserJointList, PostPutExerciseType, TrainingListItemType, alertAction } from '../../constants';

type InitialStateType = {
  userExercises: PostPutExerciseType[];
  trainingList: TrainingListItemType[];
  allTrainings: PostPutExerciseType[];
  activeTrainingId: string;
  userInviteId: GetUserJointList | null;
  activeDate: dayjs.Dayjs | null;
  drawer: {
    isOpen: boolean;
    typeDrawer: DrawerType;
    activeTraining: {
      color: string;
      content: string;
    };
    isErrorResponse: boolean;
  };
  alert: {
    isOpen: boolean;
    type: alertAction | null;
  };
};

const initialState: InitialStateType = {
  userExercises: [],
  trainingList: [],
  allTrainings: [],
  activeTrainingId: '',
  userInviteId: null,
  activeDate: null,
  drawer: {
    isOpen: false,
    typeDrawer: DrawerType.Create,
    activeTraining: {
      color: '',
      content: '',
    },
    isErrorResponse: false,
  },
  alert: {
    isOpen: false,
    type: null,
  },
};

const userExercisesSlice = createSlice({
  name: 'userExercises',
  initialState,
  reducers: {
    addAlert: (state, action) => {
      state.alert.isOpen = action.payload.isOpen;
      state.alert.type = action.payload.type;
    },
    addUserExercisesData: (state, action) => {
      state.userExercises = action.payload.userExercises;
    },
    addTrainingListData: (state, action) => {
      state.trainingList = action.payload.trainingList;
    },
    addActiveDate: (state, action) => {
      state.activeDate = action.payload.activeDate;
    },
    addActiveTrainingId: (state, action) => {
      state.activeTrainingId = action.payload.trainingId;
    },
    openDrawer: (state, action) => {
      state.drawer.isOpen = true;
      state.drawer.typeDrawer = action.payload.typeDrawer;

      if (action.payload.typeDrawer !== DrawerType.ModalCreate) {
        state.drawer.activeTraining = action.payload.activeSelect;
      }
    },
    updateTypeDrawer: (state, action) => {
      state.drawer.typeDrawer = action.payload.typeDrawer;
    },
    closeDrawer: (state) => {
      state.drawer.isOpen = false;
    },
    checkErrorResponse: (state, action) => {
      state.drawer.isErrorResponse = action.payload;
    },
    addDataFromDrawer: (state, action) => {
      const exerciseItem = {
        name: action.payload.trainingName,
        date: action.payload.trainingDate,
        exercises: action.payload.training,
        _id: action.payload.trainingId,
      };

      if (state.allTrainings.length === 0) {
        state.allTrainings.push(exerciseItem as PostPutExerciseType);
      }

      if (action.payload.updateKey === DrawerType.UpdateFuture) {
        state.allTrainings[0].exercises = action.payload.training;
      }
    },
    updateData: (state, action) => {
      state.activeTrainingId = action.payload.trainingId;
    },
    createInvite: (state, action) => {
      state.userInviteId = action.payload.userInvitedId;
    },
    removeDataFromDrawer: (state) => {
      const newAllTrainings = state.allTrainings.filter((elem: PostPutExerciseType) => elem._id);
      state.allTrainings = newAllTrainings;
    },
  },
});

export const {
  addUserExercisesData,
  addTrainingListData,
  openDrawer,
  closeDrawer,
  removeDataFromDrawer,
  checkErrorResponse,
  addActiveDate,
  addActiveTrainingId,
  addDataFromDrawer,
  updateTypeDrawer,
  addAlert,
  updateData,
  createInvite,
} = userExercisesSlice.actions;

export default userExercisesSlice.reducer;
