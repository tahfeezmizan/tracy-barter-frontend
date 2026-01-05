import { baseApi } from "../baseApi";

const qualityControlApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getQualityControlStats: builder.query({
      query: () => ({
        url: "/stats/admin/review-support-stats",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
  }),
});

export const { useGetQualityControlStatsQuery } = qualityControlApi;
