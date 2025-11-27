import React from "react";
import StatsCard from "../../stats-card";
import RevenueChart from "../revenue-chart";
import ServiceRequestChart from "../service-request-chart";
import AllClientsTable from "./all-clients";

export default function ClientsPage() {
  const stats = [
    {
      title: "Total Clients",
      value: "350",
    },
    {
      title: "Premium Members",
      value: "189",
    },
    {
      title: "Active This Month",
      value: "156",
    },
    {
      title: "New This Month",
      value: "25",
    },
  ];

  return (
    <div className="space-y-6">
      <StatsCard stats={stats} />
      <AllClientsTable />
    </div>
  );
}
