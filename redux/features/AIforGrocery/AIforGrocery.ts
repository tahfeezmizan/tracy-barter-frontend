import { baseApi } from "../baseApi";

const staffApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({  
    sendBookingChat: builder.mutation({
      query: (body) => ({
        url: '/booking/chat/send',
        method: 'POST',
        body,
      }),
      // invalidatesTags: ['Chat'],
    }),

    confirmChat: builder.mutation({
      query: (body) => ({
        url: '/booking/chat/confirm',
        method: 'POST',
        body
      }),
      // invalidatesTags: ['Chat'],
    }),
    
    getPastOrdersHistory: builder.query({
      query: () => ({
        url: "/booking/chat/past-orders",
        method: "GET",
      }),
      // transformResponse: (response: any) => {
      //   return response?.data;
      // },
      // providesTags: ["Chat"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetPastOrdersHistoryQuery, useSendBookingChatMutation, useConfirmChatMutation  } = staffApis;