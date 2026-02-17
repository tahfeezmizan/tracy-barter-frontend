"use client";

import { Briefcase, DollarSign, Download, User, UserCog, UserPlus } from "lucide-react";
import DynamicHeader from "../../dynamic-header";
import StatsCard from "../../stats-card";
import TransactionsTable from "./transactions-table";
import {
  useLazyExportPaymentQuery,
  useGetPaymentStatsQuery,
} from "@/redux/features/payments/paymentsApis";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { toast } from "sonner";

export default function PaymentsPage() {
  const { data } = useGetPaymentStatsQuery(undefined);
  const [triggerExport, { isFetching: isExporting }] =
    useLazyExportPaymentQuery();

  const handleExport = async () => {
    try {
      toast.loading("Preparing export...", { id: "export-payment" });
      const blob = await triggerExport(undefined).unwrap();

      if (blob) {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `payments-export-${Date.now()}.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        toast.success("Export downloaded", { id: "export-payment" });
      }
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Failed to export data", { id: "export-payment" });
    }
  };

  const stats = [
    {
      title: "Total Revenue",
      value: data?.totalRevenue,
      icon: User,
    },
    {
      title: "Completed Payments",
      value: data?.completedPayments,
      icon: Briefcase,
    },
    {
      title: "Pending Payments",
      value: data?.pendingPayments,
      icon: DollarSign,
    },
    {
      title: "Total Staff",
      value: data?.refundRequests,
      icon: UserCog,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6 flex items-center justify-between gap-2">
        <div>
          <SidebarTrigger className="lg:hidden" />
          <div className="border-l pl-3 lg:border-l-0 lg:pl-0">
            <h3 className="text-xl md:text-2xl font-semibold leading-snug capitalize">
              Payment Management
            </h3>
            <p className="text-base md:text-xl text-slate-300">
              Track and manage all transactions
            </p>
          </div>
        </div>

        <button
          onClick={handleExport}
          disabled={isExporting}
          className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 flex items-center gap-2 disabled:opacity-50"
        >
          {isExporting ? (
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            <Download className="size-6" />
          )}
          Export Data
        </button>
      </div>
      <StatsCard stats={stats} />
      <TransactionsTable />
    </div>
  );
}
