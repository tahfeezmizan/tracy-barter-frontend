import { baseApi } from "../baseApi";

const qualityControlApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSupport: builder.query({
      query: () => ({
        url: "/support",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
    getQualityControlStats: builder.query({
      query: () => ({
        url: "/stats/admin/review-support-stats",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),

    updateSupportStatus: builder.mutation<any, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/support/${id}`,
        method: "PATCH",
        body: { status },
      }),
    }),
  }),
});

export const {
  useGetSupportQuery,
  useGetQualityControlStatsQuery,
  useUpdateSupportStatusMutation,
} = qualityControlApi;
