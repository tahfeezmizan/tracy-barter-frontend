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
      providesTags: ["staff"],
    }),

    getStaffSpecialtyServices: builder.query({
      query: () => ({
        url: "/service/get-services-for-add-staff",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
      providesTags: ["Service"],
    }),

    createStaff: builder.mutation({
      query: (data) => ({
        url: "/user/staff",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["staff"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetStaffStatsQuery,
  useGetStaffSpecialtyServicesQuery,
  useCreateStaffMutation,
} = staffApis;
