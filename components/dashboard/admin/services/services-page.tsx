import React from "react";
import AllClientsTable from "../clients/all-clients";
import StatsCard from "../../stats-card";

export default function ServicesPage() {
  const stats = [
    {
      title: "Total Staff",
      value: "15",
    },
    {
      title: "Active Today",
      value: "10",
    },
    {
      title: "Avg Rating",
      value: "4.8⭐",
    },
    {
      title: "Services This Month",
      value: "350",
    },
  ];
  return (
    <div className="space-y-6">
      <StatsCard stats={stats} />
      <AllClientsTable />
    </div>
  );
}
