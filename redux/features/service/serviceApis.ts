import { baseApi } from "../baseApi";

const serviceApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getService: builder.query({
      query: () => ({
        url: "/service",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),

    getServiceStats: builder.query({
      query: () => ({
        url: "/stats/admin/service-stats",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),

    getSingleService: builder.query({
      query: ({ id }) => ({
        url: `/service/${id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetServiceQuery,
  useGetSingleServiceQuery,
  useGetServiceStatsQuery,
} = serviceApis;
