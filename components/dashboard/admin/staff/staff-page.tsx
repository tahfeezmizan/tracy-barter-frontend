"use client";

import React from "react";
import StatsCard from "../../stats-card";
import StaffCards from "./staff-cards";
import DynamicHeader from "../../dynamic-header";
import { UserPlus } from "lucide-react";
import { useGetStaffStatsQuery } from "@/config/Types/admin/staffApis";

export default function StaffPage() {
  const { data, isLoading } = useGetStaffStatsQuery(undefined);
  console.log("useGetStaffStatsQuery", data);

  const stats = [
    {
      title: "Total Staff",
      value: data?.totalStaff,
    },
    {
      title: "Active Today",
      value: data?.activeToday,
    },
    {
      title: "Avg Rating",
      value: `${data?.averageRating}⭐`,
    },
    {
      title: "Services This Month",
      value: data?.servicesThisMonth,
    },
  ];

  return (
    <div className="space-y-6">
      <DynamicHeader
        title={"Staff Management"}
        des="Manage your service providers"
        button="Add Staff Member"
        link="#"
        icon={UserPlus}
      />
      <StatsCard stats={stats} />
      <StaffCards />
    </div>
  );
}
