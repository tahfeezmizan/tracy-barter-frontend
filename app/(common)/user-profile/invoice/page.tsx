import InvoiceCard from '@/components/invoice/invoice-card';
import InvoiceStats from '@/components/invoice/invoice-stats';
import { invoiceData } from '@/lib/invoice-data';
import { Invoice } from '@/lib/types/invoice.types';


interface InvoiceListProps {
  invoices: Invoice[];
}

export default function InvoiceList() {
  const invoices = invoiceData;
  return (
    <div className="min-h-screen bg-background space-y-6 sm:space-y-8 p-3 sm:p-6 lg:p-8 max-w-7xl mx-auto">
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

      {invoices.length > 0 ? (
        <div className="grid gap-4">
          {invoices.map((invoice, index) => (
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
  );
}
