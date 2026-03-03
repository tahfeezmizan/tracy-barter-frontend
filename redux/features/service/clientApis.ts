/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/features/baseApi";
// import { Client, Staff } from "../types";

export default interface ClientsResponse {
  data: any[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface StaffResponse {
  data: any[];
  message: string;
  success: boolean;
}

const clientApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClientStats: builder.query({
      query: () => ({
        url: "/stats/admin/client-stats",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
    getClients: builder.query<
      ClientsResponse,
      { role: string; searchTerm?: string; page?: number }
    >({
      query: ({ role, searchTerm, page }) => ({
        url: "/user",
        method: "GET",
        params: { role, searchTerm, page },
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
      providesTags: ["client"],
    }),
    getStaff: builder.query<ClientsResponse, { page: number; limit: number }>({
      query: ({ page, limit }) => ({
        url: "/user",
        method: "GET",
        params: { role: "staff", page, limit },
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
      providesTags: ["staff"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetClientsQuery, useGetClientStatsQuery, useGetStaffQuery } =
  clientApis;
