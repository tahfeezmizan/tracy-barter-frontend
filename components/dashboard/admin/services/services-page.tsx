"use client";

import { Plus } from "lucide-react";
import DynamicHeader from "../../dynamic-header";
import StatsCard from "../../stats-card";
import AllClientsTable from "../clients/all-clients";

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
      <DynamicHeader
        title={"Service Management"}
        des="Manage your service offerings"
        button="Add Service"
        link="#"
        icon={Plus}
      />
      <StatsCard stats={stats} />
      <AllClientsTable />
    </div>
  );
}
