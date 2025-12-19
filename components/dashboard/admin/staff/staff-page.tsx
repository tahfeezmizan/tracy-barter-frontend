"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { useGetStaffStatsQuery } from "@/config/Types/admin/staffApis";
import { UserPlus } from "lucide-react";
import Link from "next/link";
import DynamicHeader from "../../dynamic-header";
import StatsCard from "../../stats-card";
import StaffCards from "./staff-cards";
import { useState } from "react";
import { AddStaffDialog } from "@/lib/modal/add-staff-dialog";

export default function StaffPage() {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetStaffStatsQuery(undefined);

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
      <div className="mb-6 flex items-center justify-between gap-2">
        <div>
          <SidebarTrigger className="lg:hidden" />
          <div className="border-l pl-3 lg:border-l-0 lg:pl-0">
            <h3 className="text-xl md:text-2xl font-semibold leading-snug capitalize">
              Staff Management
            </h3>
            <p className="text-base md:text-xl text-slate-300">
              Manage your service providers
            </p>
          </div>
        </div>

        {/* OPEN MODAL */}
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 flex items-center gap-2"
        >
          <UserPlus className="size-6" />
          Add Staff Member
        </button>
      </div>
      <StatsCard stats={stats} />
      <StaffCards />
      <AddStaffDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
