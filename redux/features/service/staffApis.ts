import { baseApi } from "@/redux/features/baseApi";

const staffApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStaffStats: builder.query({
      query: () => ({
        url: "/stats/admin/staff-stats",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetStaffStatsQuery } = staffApis;
