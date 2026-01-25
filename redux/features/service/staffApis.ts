import { baseApi } from "@/redux/features/baseApi";

const staffApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStaffSpecialtyServices: builder.query({
      query: () => ({
        url: "/service/get-services-for-add-staff",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
      providesTags: ["Service"],
    }),

    getMyOrder: builder.query({
      query: () => ({
        url: "/booking/my-orders",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
      providesTags: ["Service"],
    }),

    createStaff: builder.mutation({
      query: (data) => ({
        url: "/user/staff",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["staff"],
    }),

    getSingleStaff: builder.query({
      query: (id) => ({
        url: `/user/staff/${id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
      providesTags: ["staff"],
    }),

    deleteStaff: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["staff"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetMyOrderQuery,
  useGetStaffSpecialtyServicesQuery,
  useCreateStaffMutation,
  useGetSingleStaffQuery,
  useDeleteStaffMutation,
} = staffApis;
