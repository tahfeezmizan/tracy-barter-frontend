import { baseApi } from "../baseApi";

const adminStatsApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getadminStats: builder.query({
      query: () => ({
        url: "/stats/admin/dashboard",
        method: "GET",
      }),
        transformResponse: (response: any) => {
          return response?.data;
        },
    }),
  }),
  overrideExisting: true,
});

export const { useGetadminStatsQuery } = adminStatsApis;
