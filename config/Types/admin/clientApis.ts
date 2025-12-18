import { baseApi } from "@/redux/features/baseApi";

const clientApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClientStats: builder.query({
      query: () => ({
        url: "/stats/admin/client-stats",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
    getClients: builder.query({
      query: (role) => ({
        url: "/user",
        method: "GET",
        params: { role },
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetClientsQuery, useGetClientStatsQuery } = clientApis;
