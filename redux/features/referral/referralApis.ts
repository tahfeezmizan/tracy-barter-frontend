import { baseApi } from "../baseApi";

const referralApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReferral: builder.query({
      query: () => ({
        url: "/referral",
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
