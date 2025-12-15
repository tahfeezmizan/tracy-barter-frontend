import { baseApi } from "../baseApi";

const pricingApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPricingPlans: builder.query({
      query: () => ({
        url: "/plan",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),

    createSubscription: builder.mutation({
      query: (planId: string) => ({
        url: `/subscription/create-checkout-session/${planId}`,
        method: "POST",
      }),
    }),
  }),
});

export const { useGetPricingPlansQuery, useCreateSubscriptionMutation } =
  pricingApis;
