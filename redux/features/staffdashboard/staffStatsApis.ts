import { baseApi } from "../baseApi";

const staffStatsApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStaffStats: builder.query({
      query: () => ({
        url: "/stats/provider/dashboard",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
      providesTags: ["staff"],
    }),

    getStaffRecentService: builder.query({
      query: () => ({
        url: "/stats/provider/recent-services",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetStaffStatsQuery, useGetStaffRecentServiceQuery } =
  staffStatsApis;
