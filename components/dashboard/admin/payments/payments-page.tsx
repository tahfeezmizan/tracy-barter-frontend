"use client";

import { Briefcase, DollarSign, Download, User, UserCog } from "lucide-react";
import DynamicHeader from "../../dynamic-header";
import StatsCard from "../../stats-card";
import TransactionsTable from "./transactions-table";
import { useGetPaymentStatsQuery } from "@/redux/features/payments/paymentsApis";

export default function PaymentsPage() {
  const { data, isLoading } = useGetPaymentStatsQuery(undefined);

  console.log(data);

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
      <DynamicHeader
        title={"Payment Management"}
        des="Track and manage all transactions"
      />
      <StatsCard stats={stats} />
      <TransactionsTable />
    </div>
  );
}
