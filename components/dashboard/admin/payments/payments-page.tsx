"use client";

import { Briefcase, DollarSign, Download, User, UserCog } from "lucide-react";
import DynamicHeader from "../../dynamic-header";
import StatsCard from "../../stats-card";
import TransactionsTable from "./transactions-table";

export default function PaymentsPage() {
  const stats = [
    {
      title: "Total Clients",
      value: "245",
      icon: User,
    },
    {
      title: "Active Services",
      value: "80",
      icon: Briefcase,
    },
    {
      title: "Total Revenew",
      value: "$8500",
      icon: DollarSign,
    },
    {
      title: "Total Staff",
      value: "20",
      icon: UserCog,
    },
  ];

  return (
    <div className="space-y-6">
      <DynamicHeader
        title={"Payment Management"}
        des="Track and manage all transactions"
        button="Export Data"
        link="#"
        icon={Download}
      />
      <StatsCard stats={stats} />
      <TransactionsTable />
    </div>
  );
}
