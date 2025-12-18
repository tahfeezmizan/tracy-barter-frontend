"use client";

import { useGetClientStatsQuery } from "@/config/Types/admin/clientApis";
import DynamicHeader from "../../dynamic-header";
import StatsCard from "../../stats-card";
import AllClientsTable from "./all-clients";

export default function ClientsPage() {
  const { data, isLoading } = useGetClientStatsQuery(undefined);

  const stats = [
    {
      title: "Total Clients",
      value: data?.totalClients,
    },
    {
      title: "Premium Members",
      value: data?.premiumMembers,
    },
    {
      title: "Active This Month",
      value: data?.activeThisMonth,
    },
    {
      title: "New This Month",
      value: data?.newThisMonth,
    },
  ];

  return (
    <div className="space-y-6">
      <DynamicHeader
        title={"Client Management"}
        des="Manage your client database"
      />
      <StatsCard stats={stats} />
      <AllClientsTable />
    </div>
  );
}
