import { baseApi } from "../baseApi";

const paymentsApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPayment: builder.query({
      query: () => ({
        url: "/payment",
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

    exportPayment: builder.query({
      query: () => ({
        url: "/payment/export",
        method: "GET",
        responseHandler: (response) => response.blob(),
      }),
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

export const {
  useGetAllPaymentQuery,
  useGetPaymentStatsQuery,
  useExportPaymentQuery,
  useLazyExportPaymentQuery,
} = paymentsApis;
