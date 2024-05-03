import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '..';

import { BASE_URL, ENDPOINT_UPLOAD_IMAGE } from '../../constants/api/api-constants';

export const fileUploadApi = createApi({
  reducerPath: 'fileUploadApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const isAuthRedux = (getState() as RootState).auth.userToken;
      const token = localStorage.getItem('token') || isAuthRedux;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('accept', 'application/json');
      headers.set('Content-Type', 'multipart/form-data');
      return headers;
    },
  }),
  endpoints: (build) => ({
    postUploadImage: build.mutation({
      query: (body) => ({
        url: ENDPOINT_UPLOAD_IMAGE,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { usePostUploadImageMutation } = fileUploadApi;
