import { baseApi } from "../baseApi";

const serviceApis = baseApi.injectEndpoints({
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
  }),
});

export const { useGetServiceQuery } = serviceApis;
