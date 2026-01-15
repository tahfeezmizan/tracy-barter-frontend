import { baseApi } from "../baseApi";

const staffStatsApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStaffProfile: builder.query({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
      providesTags: ["staff"],
    }),

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

    // getMyServicesStaff: builder.query({
    //   query: () => ({
    //     url: "/booking/my-services",
    //     method: "GET",
    //   }),
    //   transformResponse: (response: any) => {
    //     return response?.data;
    //   },
    //   providesTags: ["staff"],
    // }),

    getMyServicesStaff: builder.query({
      query: (params: {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
      }) => ({
        url: "/booking/my-services",
        method: "GET",
        params: {
          page: params?.page || 1,
          limit: params?.limit || 10,
          ...(params?.search && { search: params.search }),
          ...(params?.status && { status: params.status }),
        },
      }),
      transformResponse: (response: any) => {
        return response?.data; // This should already contain both data and meta
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

    staffProfileUpdate: builder.mutation({
      query: (formData) => ({
        url: "/user/profile",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["staff"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetStaffProfileQuery,
  useGetStaffStatsQuery,
  useGetMyServicesStaffQuery,
  useGetUpcomingScheduleQuery,
  useGetStaffRecentServiceQuery,
  useUpdateBookingStatusMutation,
  useStaffProfileUpdateMutation,
} = staffStatsApis;
