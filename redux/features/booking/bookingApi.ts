import { baseApi } from "../baseApi";

const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBookings: builder.query({
    query: ({ page = 1, limit = 10, search = "" }: { page?: number; limit?: number; search?: string } = {}) => ({
        url: "/booking",
        method: "GET",
        params: { page, limit, search },
    }),
    transformResponse: (response: any) => {
        return {
            data: response?.data?.data || [],
            meta: response?.data?.meta || {}
        };
    },
    providesTags: ["Booking"],
        }),

        getBookingStats: builder.query({
            query: () => ({
                url: "/stats/admin/booking-stats",
                method: "GET",
            }),
            providesTags: ["Booking"],
      transformResponse: (response: any) => {
        return response?.data;
      },
          
        }),

        updateBookingPrice: builder.mutation({
            query: ({ bookingId, price }: { bookingId: string; price: number }) => ({
                url: `/booking/${bookingId}/add-price`,
                method: "PATCH",
                body: { price },
            }),
            invalidatesTags: ["Booking"],
        }),
    }),
    overrideExisting: true,
});

export const { useGetBookingsQuery, useUpdateBookingPriceMutation, useGetBookingStatsQuery } = bookingApi;