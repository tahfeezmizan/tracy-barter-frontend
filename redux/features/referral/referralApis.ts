/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "../baseApi";

const referralApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReferral: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/referral?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),

    createReferral: builder.mutation({
      query: (data) => ({
        url: "/referral",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetReferralQuery, useCreateReferralMutation } = referralApis;
