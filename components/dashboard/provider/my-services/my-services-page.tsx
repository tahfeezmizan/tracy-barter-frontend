import React from "react";
import StatsCard from "../../stats-card";
import { Briefcase, DollarSign, User, UserCog } from "lucide-react";
import ServiceList from "./service-list";

export default function MyServicesPage() {
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
      <ServiceList />
    </div>
  );
}
