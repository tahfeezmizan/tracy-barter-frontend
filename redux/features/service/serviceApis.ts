/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../baseApi";
import { ServiceItem } from "@/config/Types/types";

interface ServicesResponse {
  data: ServiceItem[];
  message: string;
  success: boolean;
}

const serviceApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getService: builder.query<ServicesResponse, void>({
      query: () => ({
        url: "/service",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data?.data;
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
