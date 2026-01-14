"use client";

import { Briefcase, DollarSign, User, UserCog } from "lucide-react";
import StatsCard from "../../stats-card";
import ServiceList from "./service-list";
import { useGetStaffStatsQuery } from "@/redux/features/staffdashboard/staffStatsApis";

export default function MyServicesPage() {
  const { data } = useGetStaffStatsQuery(undefined);

  const stats = [
    {
      title: "Total Services",
      value: data?.totalServices,
      icon: User,
    },
    {
      title: "Scheduled",
      value: "80",
      icon: Briefcase,
    },
    {
      title: "Completed",
      value: data?.completedServices,
      icon: DollarSign,
    },
    {
      title: "Earnings",
      value: data?.totalEarnings,
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
