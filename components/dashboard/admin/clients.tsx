import React from "react";
import StatsCard from "../stats-card";

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
    <div>
      <StatsCard stats={stats} />
    </div>
  );
}
