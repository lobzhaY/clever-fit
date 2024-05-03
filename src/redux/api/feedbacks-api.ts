import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '..';

import { BASE_URL, ENDPOINT_FEEDBACKS } from '../../constants/api/api-constants';
import { FeedbackType, PostFeedbackType } from '../../constants/api/api-types';

export const feedbacksApi = createApi({
  reducerPath: 'feedbacksApi',
  tagTypes: ['Feedbacks'],
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
    getFeedbacks: build.query({
      query: () => ENDPOINT_FEEDBACKS,
      transformResponse: (getFeedbacksReturnValue: FeedbackType[]) => {
        const sortFeedbacksReturnValue = getFeedbacksReturnValue.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        return sortFeedbacksReturnValue;
      },
      providesTags: (result: FeedbackType[] | undefined) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Feedbacks' as const, id })),
              { type: 'Feedbacks' as const, id: 'LIST' },
            ]
          : [{ type: 'Feedbacks' as const, id: 'LIST' }],
    }),
    postFeedback: build.mutation({
      query: (body: PostFeedbackType) => ({
        url: ENDPOINT_FEEDBACKS,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Feedbacks', id: 'LIST' }],
    }),
  }),
});

export const { useLazyGetFeedbacksQuery, usePostFeedbackMutation } = feedbacksApi;
