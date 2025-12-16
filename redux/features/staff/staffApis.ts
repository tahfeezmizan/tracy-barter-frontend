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
  }),
});

export const { useGetServiceQuery, useGetStaffsbyServiceQuery } = staffApis;
