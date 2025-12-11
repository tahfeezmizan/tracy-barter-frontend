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
  }),
});

export const { useGetPricingPlansQuery } = pricingApis;
