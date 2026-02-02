/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "../baseApi";

const staffApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getService: builder.query({
      query: () => ({
        url: "/service",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),

    getStaffsbyService: builder.query({
      query: ({ id }) => ({
        url: `/user/staff/service/${id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
    getScheduledBookingsByDate: builder.query({
      query: (date: string) => ({
        url: "/booking/scheduled",
        method: "GET",
        params: { date },
      }),
      transformResponse: (response: any) => response.data,
    }),

    getSingleShedule: builder.query({
      query: (id: string) => ({
        url: `/booking/${id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => response.data,
    }),
  }),
});

export const {
  useGetServiceQuery,
  useGetSingleSheduleQuery,
  useGetStaffsbyServiceQuery,
  useGetScheduledBookingsByDateQuery,
} = staffApis;
