/* eslint-disable @typescript-eslint/no-explicit-any */
import { ServicesResponse } from "@/lib/types/service.types";
import { baseApi } from "../baseApi";

const serviceApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getService: builder.query<
      ServicesResponse,
      { page: number; limit: number }
    >({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/service?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      transformResponse: (response: any): ServicesResponse => {
        return response?.data;
      },
      providesTags: ["Service"],
    }),

    getServiceHome: builder.query({
      query: () => ({
        url: `/service`,
        method: "GET",
      }),
      transformResponse: (response: any): ServicesResponse => {
        return response?.data;
      },
      providesTags: ["Service"],
    }),

    getServiceStats: builder.query({
      query: () => ({
        url: "/stats/admin/service-stats",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
      providesTags: ["Service"],
    }),

    getSingleService: builder.query({
      query: ({ id }) => ({
        url: `/service/${id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
      providesTags: ["Service"],
    }),

    createService: builder.mutation({
      query: (data) => ({
        url: "/service",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Service"],
    }),

    createBooking: builder.mutation({
      query: (data) => ({
        url: "/booking",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Service"],
    }),

    updateService: builder.mutation({
      query: ({ id, data }) => ({
        url: `/service/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Service"],
    }),

    deleteService: builder.mutation({
      query: (id) => ({
        url: `/service/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Service"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetServiceQuery,
  useGetServiceHomeQuery,
  useGetSingleServiceQuery,
  useGetServiceStatsQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useCreateBookingMutation,
  useDeleteServiceMutation,
} = serviceApis;
