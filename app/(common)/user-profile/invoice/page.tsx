"use client"

import InvoiceCard from '@/components/invoice/invoice-card';
import { Invoice } from '@/lib/types/invoice.types';
import { useGetMyInvoicesQuery } from '@/redux/features/invoices/invoicesApi';


interface InvoiceListProps {
  invoices: Invoice[];
}

export default function InvoiceList() {
  const { data, isLoading } = useGetMyInvoicesQuery(undefined);
const invoices = data?.data;
  console.log(invoices);
  return (
    <div className="flex items-center overflow-hidden max-w-7xl mx-auto px-4 xl:px-0 py-10 md:py-20 md:pt-24 lg:pt-24 ">
        <div className="space-y-6 w-full p-6 bg-white rounded-2xl border">
      <div className="animate-fade-in space-y-1 sm:space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
          Your Invoices
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Manage and view your monthly invoices
        </p>
      </div>

      {/* {invoices.length > 0 && (
        <InvoiceStats invoices={invoices} />
      )} */}

      {invoices?.length > 0 ? (
        <div className="grid gap-4">
          {invoices?.map((invoice, index) => (
            <div
              key={invoice._id}
              className="animate-slide-up"
              style={{
                animationDelay: `${(index + 4) * 100}ms`,
              }}
            >
              <InvoiceCard invoice={invoice} />
            </div>
          ))}
        </div>
      ) : (
        <div className="animate-fade-in rounded-lg border border-border bg-card p-12 text-center">
          <p className="text-muted-foreground">No invoices found</p>
        </div>
      )}
      </div>
    </div>
  );
}
