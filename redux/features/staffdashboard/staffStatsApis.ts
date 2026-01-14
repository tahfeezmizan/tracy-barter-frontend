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

    getMyServicesStaff: builder.query({
      query: () => ({
        url: "/booking/my-services",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
      providesTags: ["staff"],
    }),

    getUpcomingSchedule: builder.query({
      query: () => ({
        url: "/booking/my-upcoming",
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

    updateBookingStatus: builder.mutation({
      query: ({ bookingId, status }) => ({
        url: `/booking/${bookingId}/status`,
        method: "PATCH", // or PUT if your backend uses PUT
        body: { status },
      }),
      invalidatesTags: ["staff"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetStaffStatsQuery,
  useGetMyServicesStaffQuery,
  useGetUpcomingScheduleQuery,
  useGetStaffRecentServiceQuery,
  useUpdateBookingStatusMutation,
} = staffStatsApis;
