import { baseApi } from "../baseApi";

const pricingApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPricingPlans: builder.query({
      query: () => ({
        url: "/plan",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
      providesTags: ["Pricing"],
    }),

    createSubscription: builder.mutation({
      query: (planId: string) => ({
        url: `/subscription/create-checkout-session/${planId}`,
        method: "POST",
      }),
    }),

    updatePricingPlan: builder.mutation({
      query: ({ id, data }) => ({
        url: `/plan/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Pricing"],
    }),

    deletePricingPlan: builder.mutation({
      query: (id: string) => ({
        url: `/plan/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Pricing"],
    }),
  }),
});

export const {
  useGetPricingPlansQuery,
  useCreateSubscriptionMutation,
  useUpdatePricingPlanMutation,
  useDeletePricingPlanMutation,
} = pricingApis;
