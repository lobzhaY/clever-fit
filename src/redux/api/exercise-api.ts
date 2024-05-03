import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '..';

import { BASE_URL, ENDPOINT_EXERCISE } from '../../constants/api/api-constants';
import { GetExerciseType, PostPutExerciseType } from '../../constants/api/api-types';

export const exerciseApi = createApi({
  reducerPath: 'exerciseApi',
  tagTypes: ['Trainings'],
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
    getExercise: build.query({
      query: () => ENDPOINT_EXERCISE,
      providesTags: (result: GetExerciseType[] | undefined) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Trainings' as const, _id })),
              { type: 'Trainings', id: 'LIST' },
            ]
          : [{ type: 'Trainings', id: 'LIST' }],
    }),
    postExercise: build.mutation({
      query: (body: PostPutExerciseType) => ({
        url: ENDPOINT_EXERCISE,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Trainings', id: 'LIST' }],
    }),
    putExercise: build.mutation({
      query(data: { id: string; body: PostPutExerciseType }) {
        const { id, body } = data;
        return {
          url: `${ENDPOINT_EXERCISE}/${id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['Trainings'],
    }),
    deleteExercise: build.mutation({
      query(id: string) {
        return {
          url: `${ENDPOINT_EXERCISE}/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Trainings'],
    }),
  }),
});

export const {
  useLazyGetExerciseQuery,
  usePostExerciseMutation,
  usePutExerciseMutation,
  useDeleteExerciseMutation,
} = exerciseApi;
