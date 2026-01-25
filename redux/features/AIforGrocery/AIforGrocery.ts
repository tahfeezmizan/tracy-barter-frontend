import { baseApi } from "../baseApi";

const staffApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({        
    getGroceryList: builder.query({
      query: () => ({
        url: "/booking/my-orders",
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

export const { useGetGroceryListQuery } = staffApis;