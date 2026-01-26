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
    
    getGroceryChat: builder.query({
      query: () => ({
        url: "/booking/chat/send",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
      providesTags: ["Service"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetGroceryChatQuery, useSendBookingChatMutation } = staffApis;