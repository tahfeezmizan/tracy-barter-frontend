import { baseApi } from "../baseApi";

const adminStatsApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminStats: builder.query({
      query: () => ({
        url: "/stats/admin/dashboard",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),

    getAdminRecentService: builder.query({
      query: () => ({
        url: "/stats/admin/recent-services",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),

    getStaffStatsOnAdmin: builder.query({
      query: () => ({
        url: "/stats/admin/staff-stats",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
      providesTags: ["staff"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAdminStatsQuery,
  useGetAdminRecentServiceQuery,
  useGetStaffStatsOnAdminQuery,
} = adminStatsApis;
