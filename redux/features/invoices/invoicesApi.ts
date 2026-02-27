import { baseApi } from "../baseApi";

const invoicesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyInvoices: builder.query({
            query: () => "/invoice/my-invoices",
        }),
        getInvoiceById: builder.query({
            query: (id) => `/invoice/${id}`,
        }),
        payInvoice: builder.mutation({
            query: (id) => ({
                url: `/payment/invoice-checkout/${id}`,
                method: "POST",
            }),
        })
    })
    
})

export const { useGetMyInvoicesQuery, useGetInvoiceByIdQuery, usePayInvoiceMutation } = invoicesApi;

export default invoicesApi;
