import { combineReducers } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';

import { fitApi } from './api/fit-api';
import { feedbacksApi } from './api/feedbacks-api';
import { exerciseApi } from './api/exercise-api';
import { catalogsApi } from './api/catalogs-api';
import { userApi } from './api/user-api';
import { fileUploadApi } from './api/file-upload-api';
import { tariffApi } from './api/tariff-api';
import { inviteApi } from './api/invite-api';

import modalSlice from './slices/modal-slice';
import navSlice from './slices/nav-slice';
import userExercisesSlice from './slices/exercise-slice';
import authSlice from './slices/auth-slice';
import userSlice from './slices/user-slice';
import settingsSlice from './slices/settings-slice';
import inviteSlice from './slices/invite-slice';
import loadingSlice from './slices/loading-slice';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
  savePreviousLocations: 1,
});

export const store = configureStore({
  reducer: combineReducers({
    router: routerReducer,
    loader: loadingSlice,
    modal: modalSlice,
    auth: authSlice,
    navigation: navSlice,
    userExercises: userExercisesSlice,
    user: userSlice,
    settings: settingsSlice,
    invite: inviteSlice,
    [fitApi.reducerPath]: fitApi.reducer,
    [feedbacksApi.reducerPath]: feedbacksApi.reducer,
    [exerciseApi.reducerPath]: exerciseApi.reducer,
    [catalogsApi.reducerPath]: catalogsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [fileUploadApi.reducerPath]: fileUploadApi.reducer,
    [tariffApi.reducerPath]: tariffApi.reducer,
    [inviteApi.reducerPath]: inviteApi.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      routerMiddleware,
      fitApi.middleware,
      feedbacksApi.middleware,
      exerciseApi.middleware,
      catalogsApi.middleware,
      userApi.middleware,
      fileUploadApi.middleware,
      tariffApi.middleware,
      inviteApi.middleware
    ),
});

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
