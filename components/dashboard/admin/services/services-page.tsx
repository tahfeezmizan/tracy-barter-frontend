"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { AddServiceDialog } from "@/lib/modal/add-service-dialog";
import { useGetServiceStatsQuery } from "@/redux/features/service/serviceApis";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import StatsCard from "../../stats-card";
import AllServicesTable from "./all-services-table";

export default function ServicesPage() {
  const [open, setOpen] = useState(false);

  const { data: statsData } = useGetServiceStatsQuery(undefined);

  const stats = [
    {
      title: "Total Services",
      value: statsData?.totalServices,
    },
    {
      title: "Active Services",
      value: statsData?.activeServices,
    },
    {
      title: "Total Bookings",
      value: statsData?.totalBookings,
    },
    {
      title: "Avg Price",
      value: statsData?.averagePrice,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6 flex items-center justify-between gap-2">
        <div>
          <SidebarTrigger className="lg:hidden" />
          <div className="border-l pl-3 lg:border-l-0 lg:pl-0">
            <h3 className="text-xl md:text-2xl font-semibold leading-snug capitalize">
              Service Management
            </h3>
            <p className="text-base md:text-xl text-slate-300">
              Manage your service offerings
            </p>
          </div>
        </div>

        {/* OPEN MODAL */}
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 flex items-center gap-2"
        >
          <UserPlus className="size-6" />
          Add Service
        </button>
      </div>

      <StatsCard stats={stats} />
      <AllServicesTable />
      <AddServiceDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
