import React from "react";
import StatsCard from "../../stats-card";
import StaffCards from "./staff-cards";

export default function StaffPage() {
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
      <StaffCards />
    </div>
  );
}
