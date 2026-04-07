"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Download,
  Eye,
  CreditCard,
  ChevronDown,
  ChevronUp,
  CloudCog,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { formatMonth } from "@/lib/utils";
import InvoiceSummary from "./invoice-summary";
import InvoiceBookingTable from "./invoice-booking-table";
import { Invoice } from "@/lib/types/invoice.types";
import { usePayInvoiceMutation } from "@/redux/features/invoices/invoicesApi";
import { useRouter } from "next/navigation";

interface InvoiceCardProps {
  invoice: Invoice;
}

export default function InvoiceCard({ invoice }: InvoiceCardProps) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  const [payInvoice, { isLoading }] = usePayInvoiceMutation();

  const handlePayNow = async (id: string) => {
    try {
      const res = await payInvoice(id).unwrap();

      if (res.success) {
        router.push(res.data);
      }
    } catch (error) {}
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <Card className="overflow-hidden border border-border transition-all duration-300 hover:shadow-md">
      <CardHeader
        className="cursor-pointer border-b border-border bg-card/50 p-3 sm:p-4 lg:p-6 transition-all duration-300 hover:bg-card/70"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col gap-3 sm:gap-4 lg:gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-1 sm:gap-2 lg:gap-3">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-foreground">
                  Invoice for {formatMonth(invoice.month)}
                </h3>
                <Badge
                  className={`text-xs sm:text-sm ${getStatusColor(invoice.status)}`}
                >
                  {invoice.status.charAt(0).toUpperCase() +
                    invoice.status.slice(1)}
                </Badge>
                {isExpanded ? (
                  <ChevronUp className="ml-auto h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground sm:ml-0" />
                ) : (
                  <ChevronDown className="ml-auto h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground sm:ml-0" />
                )}
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">
                Invoice ID: {invoice._id}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-0.5 sm:gap-1 flex-shrink-0">
            <div className="text-xl sm:text-2xl lg:text-2xl font-bold text-foreground">
              ${invoice.totalAmount.toFixed(2)}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {invoice.bookings.length} booking
              {invoice.bookings.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent
        className={`overflow-hidden p-6 transition-all duration-300 ${isExpanded ? "max-h-[2000px]" : "max-h-0"}`}
      >
        <div className="space-y-6">
          <InvoiceBookingTable bookings={invoice.bookings} />
          <InvoiceSummary invoice={invoice} />

          <div className="flex flex-col gap-2 sm:gap-3 border-t border-border pt-4 sm:pt-6 sm:flex-row">
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 text-xs sm:text-sm"
              onClick={() => alert("Download PDF functionality")}
            >
              <Download className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Download PDF</span>
              <span className="sm:hidden">Download</span>
            </Button>
            {/* <Button
                variant="outline"
                size="sm"
                className="flex items-center justify-center gap-2 text-xs sm:text-sm"
                onClick={() => alert('View details functionality')}
              >
                <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">View Details</span>
                <span className="sm:hidden">Details</span>
              </Button> */}
            {invoice.status !== "paid" && (
              <Button
                onClick={() => handlePayNow(invoice?._id)}
                className="flex items-center justify-center gap-2 text-xs sm:text-sm bg-primary hover:bg-primary/80"
              >
                {isLoading ? (
                  <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                ) : (
                  <CreditCard className="h-3 w-3 sm:h-4 sm:w-4" />
                )}
                <span className="hidden sm:inline">Pay Now</span>
                <span className="sm:hidden">Pay</span>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
