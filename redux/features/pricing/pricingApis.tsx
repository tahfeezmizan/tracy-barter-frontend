import { baseApi } from "../baseApi";

const pricingApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPricingPlans: builder.query({
      query: () => ({
        url: "/plan",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPricingPlansQuery } = pricingApis;
