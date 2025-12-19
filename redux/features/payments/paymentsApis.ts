import { baseApi } from "../baseApi";

const paymentsApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPayment: builder.query({
      query: () => ({
        url: "/service",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),

    getPaymentStats: builder.query({
      query: () => ({
        url: "/stats/admin/payment-stats",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),

    // getSingleService: builder.query({
    //   query: ({ id }) => ({
    //     url: `/service/${id}`,
    //     method: "GET",
    //   }),
    //   transformResponse: (response: any) => {
    //     return response?.data;
    //   },
    // }),
  }),
  overrideExisting: true,
});

export const { useGetPaymentQuery, useGetPaymentStatsQuery } = paymentsApis;
