"use client"

import AllBookingTable from "@/components/dashboard/admin/booking/AllBookingTable";
import DynamicHeader from "@/components/dashboard/dynamic-header";
import StatsCard from "@/components/dashboard/stats-card";
import { useGetBookingStatsQuery } from "@/redux/features/booking/bookingApi";

export default function BookingPage() {

  const {data} = useGetBookingStatsQuery(undefined)  

const stats = [
    {
      title: "Scheduled",
      value: data?.scheduled?.revenue,
    },
    {
      title: "Completed",
      value: data?.completed?.revenue,
    },
    {
      title: "InProgress",
      value: data?.inProgress?.revenue,
    },
    {
      title: "Confirmed",
      value: data?.confirmed?.revenue,
    },
  ];

    return (
        <div className="space-y-6">
            <DynamicHeader
                    title={"Booking Management"}
                    des="View and manage your booking requests"
                  />
            <StatsCard stats={stats} />
            <AllBookingTable />
        </div>
    );
}