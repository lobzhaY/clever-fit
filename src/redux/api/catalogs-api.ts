import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '..';

import {
  BASE_URL,
  ENDPOINT_PALS_LIST,
  ENDPOINT_TARIFF_LIST,
  ENDPOINT_TRAINING_LIST,
  ENDPOINT_USER_JOINT_LIST,
  ENDPOINT_USER_LIST,
} from '../../constants/api/api-constants';
import { GetAllPalsList } from '../../constants/api/api-types';

export const catalogsApi = createApi({
  reducerPath: 'catalogsApi',
  tagTypes: ['Palls', 'UsersJoint'],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const isAuthRedux = (getState() as RootState).auth.userToken;
      const token = localStorage.getItem('token') || isAuthRedux;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('accept', 'application/json');
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (build) => ({
    getTrainingList: build.query({
      query: () => ENDPOINT_TRAINING_LIST,
    }),
    getTariffList: build.query({
      query: () => ENDPOINT_TARIFF_LIST,
    }),
    getPalsList: build.query({
      query: () => ENDPOINT_PALS_LIST,
      providesTags: (result: GetAllPalsList | undefined) =>
        result
          ? [
              ...result.map(({ id, status }) => ({ type: 'Palls' as const, id, status })),
              { type: 'Palls', id: 'LIST', status: 'LIST' },
            ]
          : [{ type: 'Palls', id: 'LIST', status: 'LIST' }],
    }),
    getUserJointTrainingList: build.query({
      query: (queryParams) => ({
        url: ENDPOINT_USER_JOINT_LIST,
        params: queryParams,
        providesTags: (result: GetAllPalsList | undefined) =>
          result
            ? [
                ...result.map(({ id }) => ({ type: 'UsersJoint' as const, id })),
                { type: 'UsersJoint', id: 'LIST' },
              ]
            : [{ type: 'UsersJoint', id: 'LIST' }],
      }),
    }),
    getUserList: build.query({
      query: () => ENDPOINT_USER_LIST,
      providesTags: (result: GetAllPalsList | undefined) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'UsersJoint' as const, id })),
              { type: 'UsersJoint', id: 'LIST' },
            ]
          : [{ type: 'UsersJoint', id: 'LIST' }],
    }),
  }),
});

export const {
  useLazyGetTrainingListQuery,
  useGetTariffListQuery,
  useGetPalsListQuery,
  useLazyGetUserJointTrainingListQuery,
  useLazyGetPalsListQuery,
} = catalogsApi;
