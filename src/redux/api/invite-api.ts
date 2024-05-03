import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '..';

import { BASE_URL, ENDPOINT_INVITE } from '../../constants/api/api-constants';
import { GetAllInvite, PostInvite, PutInvite } from '../../constants/api/api-types';

export const inviteApi = createApi({
  reducerPath: 'inviteApi',
  tagTypes: ['Workouts'],
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
    getInvite: build.query<GetAllInvite, void>({
      query: () => ENDPOINT_INVITE,
      providesTags: (result: GetAllInvite | undefined) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Workouts' as const, _id })),
              { type: 'Workouts', id: 'LIST' },
            ]
          : [{ type: 'Workouts', id: 'LIST' }],
    }),
    postInvite: build.mutation({
      query: (body: PostInvite) => ({
        url: ENDPOINT_INVITE,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Workouts', id: 'LIST' }],
    }),
    putInvite: build.mutation({
      query: (body: PutInvite) => ({
        url: ENDPOINT_INVITE,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Workouts', id: 'LIST' }],
    }),
    deleteInvite: build.mutation({
      query(id: string) {
        return {
          url: `${ENDPOINT_INVITE}/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Workouts'],
    }),
  }),
});

export const {
  useGetInviteQuery,
  usePutInviteMutation,
  useDeleteInviteMutation,
  usePostInviteMutation,
} = inviteApi;
