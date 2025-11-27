import React from "react";
import StatsCard from "../stats-card";
import { Briefcase, DollarSign, User, UserCog } from "lucide-react";
import RevenueChart from "../admin/revenue-chart";
import ServiceRequestChart from "../admin/service-request-chart";
import RecentServices from "../admin/recent-services";

export default function AdminDash() {
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
      <StatsCard stats={stats} />
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        <ServiceRequestChart />
        <RevenueChart />
      </div>
      <RecentServices />
    </div>
  );
}
