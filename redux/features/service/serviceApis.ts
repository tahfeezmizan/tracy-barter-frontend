/* eslint-disable @typescript-eslint/no-explicit-any */
import { ServicesResponse } from "@/lib/types/service.types";
import { baseApi } from "../baseApi";
import { ServiceItem } from "@/config/Types/types";

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
    }),

    getServiceStats: builder.query({
      query: () => ({
        url: "/stats/admin/service-stats",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),

    getSingleService: builder.query({
      query: ({ id }) => ({
        url: `/service/${id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetServiceQuery,
  useGetSingleServiceQuery,
  useGetServiceStatsQuery,
} = serviceApis;
