import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '..';

import { BASE_URL, ENDPOINT_USER } from '../../constants/api/api-constants';
import { GetCurrentUserType } from '../../constants/api/api-types';

export const userApi = createApi({
  reducerPath: 'userApi',
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
    getCurrentUser: build.query<GetCurrentUserType, void>({
      query: () => `${ENDPOINT_USER}/me`,
    }),
    putUser: build.mutation({
      query: (body) => ({
        url: ENDPOINT_USER,
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const { useGetCurrentUserQuery, useLazyGetCurrentUserQuery, usePutUserMutation } = userApi;
