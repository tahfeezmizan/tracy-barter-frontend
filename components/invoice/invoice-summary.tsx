import { Invoice } from "@/lib/types/invoice.types";


interface InvoiceSummaryProps {
  invoice: Invoice;
}

export default function InvoiceSummary({ invoice }: InvoiceSummaryProps) {
  const totalServicePrice = invoice.bookings.reduce(
    (sum, booking) => sum + booking.price,
    0
  );
  const totalBookingFees = invoice.bookings.reduce(
    (sum, booking) => sum + booking.bookingFee,
    0
  );
  const totalServiceCharges = invoice.bookings.reduce(
    (sum, booking) => sum + booking.serviceCharge,
    0
  );

  const summaryItems = [
    {
      label: 'Total Service Price',
      value: totalServicePrice,
    },
    {
      label: 'Total Booking Fees',
      value: totalBookingFees,
    },
    {
      label: 'Total Service Charges',
      value: totalServiceCharges,
    },
  ];

  return (
    <div className="space-y-3 sm:space-y-4">
      <h4 className="text-sm sm:text-base font-semibold text-foreground">Invoice Summary</h4>
      <div className="space-y-2 sm:space-y-3 rounded-lg bg-card/30 p-3 sm:p-4">
        {summaryItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between text-xs sm:text-sm gap-2"
          >
            <span className="text-muted-foreground truncate">{item.label}</span>
            <span className="font-medium text-foreground flex-shrink-0">
              ${item.value.toFixed(2)}
            </span>
          </div>
        ))}
        <div className="border-t border-border pt-2 sm:pt-3">
          <div className="flex items-center justify-between font-semibold text-foreground gap-2">
            <span className="text-sm sm:text-base">Invoice Total</span>
            <span className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">
              ${invoice.totalAmount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
