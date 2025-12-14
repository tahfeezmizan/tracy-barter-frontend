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
  }),
});

export const { useGetReviewQuery } = reviewApis;
