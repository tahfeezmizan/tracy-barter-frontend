import { baseApi } from "../baseApi";

const supportApi = baseApi.injectEndpoints({
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

        createSupportTicket: builder.mutation({
            query: (data) => ({
                url: "/support",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Support"],
        }),
    }),
    overrideExisting: true,
});

export const { useGetSupportQuery, useCreateSupportTicketMutation } = supportApi;