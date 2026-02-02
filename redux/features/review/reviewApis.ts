/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "../baseApi";

const reviewApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReview: builder.query({
      query: () => ({
        url: "/review",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),

    createReview: builder.mutation({
      query: (data) => ({
        url: "/review",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Review"],
    }),

    updateReviewStatus: builder.mutation<any, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/review/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
    }),
  }),
});

export const {
  useGetReviewQuery,
  useUpdateReviewStatusMutation,
  useCreateReviewMutation,
} = reviewApis;
