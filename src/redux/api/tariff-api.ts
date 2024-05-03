import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '..';

import { BASE_URL, ENDPOINT_TARIFF } from '../../constants/api/api-constants';
import { PostTariffType } from '../../constants/api/api-types';

export const tariffApi = createApi({
  reducerPath: 'tariffApi',
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
    postTariff: build.mutation({
      query: (body: PostTariffType) => ({
        url: ENDPOINT_TARIFF,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { usePostTariffMutation } = tariffApi;
