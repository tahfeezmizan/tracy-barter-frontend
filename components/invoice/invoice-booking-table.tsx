
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { Booking } from '@/lib/types/invoice.types';


interface InvoiceBookingTableProps {
  bookings: Booking[];
}

export default function InvoiceBookingTable({
  bookings,
}: InvoiceBookingTableProps) {
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'unpaid':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <h4 className="text-sm sm:text-base font-semibold text-foreground">Booking Details</h4>
      <div className="overflow-x-auto rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-border bg-muted/50">
              <TableHead className="text-xs sm:text-sm text-foreground">Date</TableHead>
              <TableHead className="text-xs sm:text-sm text-foreground">Status</TableHead>
              <TableHead className="text-right text-xs sm:text-sm text-foreground">
                Service Price
              </TableHead>
              <TableHead className="text-right text-xs sm:text-sm text-foreground">
                Booking Fee
              </TableHead>
              <TableHead className="hidden sm:table-cell text-right text-xs sm:text-sm text-foreground">
                Service Charge
              </TableHead>
              <TableHead className="text-right text-xs sm:text-sm text-foreground">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking._id} className="border-border hover:bg-muted/30 transition-colors">
                <TableCell className="text-xs sm:text-sm text-muted-foreground py-2 sm:py-3">
                  {formatDate(booking.date)}
                </TableCell>
                <TableCell className="py-2 sm:py-3">
                  <Badge className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    {booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-xs sm:text-sm font-medium text-foreground py-2 sm:py-3">
                  ${booking.price.toFixed(2)}
                </TableCell>
                <TableCell className="text-right text-xs sm:text-sm font-medium text-foreground py-2 sm:py-3">
                  ${booking.bookingFee.toFixed(2)}
                </TableCell>
                <TableCell className="hidden sm:table-cell text-right text-xs sm:text-sm font-medium text-foreground py-2 sm:py-3">
                  ${booking.serviceCharge.toFixed(2)}
                </TableCell>
                <TableCell className="text-right text-xs sm:text-sm font-semibold text-foreground py-2 sm:py-3">
                  $
                  {(
                    booking.price +
                    booking.bookingFee +
                    booking.serviceCharge
                  ).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
