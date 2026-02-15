/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "@/redux/features/baseApi";

const staffApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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

    getMyOrder: builder.query({
      query: () => ({
        url: "/booking/my-orders",
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

    updateStaff: builder.mutation({
      query: ({ id, ...data }) => {
        const { bio, ...rest } = data;
        return {
          url: `/user/${id}`,
          method: "PATCH",
          body: rest,
        };
      },
      invalidatesTags: ["staff"],
    }),

    getSingleStaff: builder.query({
      query: (id) => ({
        url: `/user/staff/${id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
      providesTags: ["staff"],
    }),

    deleteStaff: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["staff"],
    }),

  
    getWeeklySchedule: builder.query({
      query: ({ date, staffId }) => ({
        url: "/booking/weekly",
        method: "GET",
        params: { date, staffId },
      }),
      transformResponse: (response: any) => response.data,
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetMyOrderQuery,
  useGetStaffSpecialtyServicesQuery,
  useCreateStaffMutation,
  useGetSingleStaffQuery,
  useDeleteStaffMutation,
  useUpdateStaffMutation,
  useGetWeeklyScheduleQuery,
} = staffApis;
