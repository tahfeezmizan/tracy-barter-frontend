/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/features/baseApi";
// import { Client, Staff } from "../types";

interface ClientsResponse {
  data: any[];
  message: string;
  success: boolean;
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
    getClients: builder.query<ClientsResponse, string>({
      query: (role) => ({
        url: "/user",
        method: "GET",
        params: { role },
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
    getStaff: builder.query<StaffResponse, void>({
      query: () => ({
        url: "/user",
        method: "GET",
        params: { role: "staff" },
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
