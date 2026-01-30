import DynamicHeader from "@/components/dashboard/dynamic-header";
import StatsCard from "@/components/dashboard/stats-card";

export default function BookingPage() {
const stats = [
    {
      title: "Scheduled",
      value: 10,
    },
    {
      title: "Completed",
      value: 50,
    },
    {
      title: "InProgress",
      value: 100,
    },
    {
      title: "Cancelled",
      value: 77,
    },
  ];

    return (
        <div className="space-y-6">
            <DynamicHeader
                    title={"Booking Management"}
                    des="View and manage your booking requests"
                  />
            <StatsCard stats={stats} />

        </div>
    );
}