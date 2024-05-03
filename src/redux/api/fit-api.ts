import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  BASE_URL,
  ENDPOINT_AUTHORIZATION,
  ENDPOINT_CHANGE_EMAIL,
  ENDPOINT_CHECK_EMAIL,
  ENDPOINT_CONFIRM_EMAIL,
  ENDPOINT_REGISTRATION,
} from '../../constants/api/api-constants';
import {
  AuthBodyType,
  ChangePasswordBodyType,
  ConfirmEmailBodyType,
} from '../../constants/api/api-types';

export const fitApi = createApi({
  reducerPath: 'fitApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      headers.set('Authorization', `Bearer ${token}`);
      headers.set('accept', 'application/json');
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (build) => ({
    postRegistration: build.mutation({
      query: (body: AuthBodyType) => ({
        url: ENDPOINT_REGISTRATION,
        method: 'POST',
        body,
      }),
    }),
    postAuthorization: build.mutation({
      query: (body: AuthBodyType) => ({
        url: ENDPOINT_AUTHORIZATION,
        method: 'POST',
        body,
      }),
    }),
    postCheckEmail: build.mutation({
      query: (body: { email: string }) => ({
        url: ENDPOINT_CHECK_EMAIL,
        method: 'POST',
        body,
      }),
    }),
    postConfirmEmail: build.mutation({
      query: (body: ConfirmEmailBodyType) => ({
        url: ENDPOINT_CONFIRM_EMAIL,
        method: 'POST',
        body,
        credentials: 'include',
      }),
    }),
    postChangePassword: build.mutation({
      query: (body: ChangePasswordBodyType) => ({
        url: ENDPOINT_CHANGE_EMAIL,
        method: 'POST',
        body,
        credentials: 'include',
      }),
    }),
  }),
});

export const {
  usePostRegistrationMutation,
  usePostAuthorizationMutation,
  usePostCheckEmailMutation,
  usePostConfirmEmailMutation,
  usePostChangePasswordMutation,
} = fitApi;
