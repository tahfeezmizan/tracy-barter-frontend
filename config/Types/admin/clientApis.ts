import { baseApi } from "@/redux/features/baseApi";

const adminStatsApis = baseApi.injectEndpoints({
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
      query: () => ({
        url: "/user",
        method: "GET",
        params: { role: "client" },
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetClientsQuery, useGetClientStatsQuery } = adminStatsApis;
