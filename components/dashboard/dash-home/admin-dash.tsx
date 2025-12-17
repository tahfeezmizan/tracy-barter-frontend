import { StatsCardItem } from "@/config/Types/admin/adminType";

import LoadingSpinner from "@/lib/loading-spinner";
import { useGetAdminStatsQuery } from "@/redux/features/admindashboard/adminStatsApis";
import { Briefcase, DollarSign, User, UserCog } from "lucide-react";
import RecentServices from "../admin/recent-services";
import RevenueChart from "../admin/revenue-chart";
import ServiceRequestChart from "../admin/service-request-chart";
import DynamicHeader from "../dynamic-header";
import StatsCard from "../stats-card";

export default function AdminDash() {
  const { data, isLoading } = useGetAdminStatsQuery(undefined);
  console.log("adminStatsApis", data);

  const stats: StatsCardItem[] = [
    {
      title: "Total Clients",
      value: data?.totalClients,
      icon: User,
    },
    {
      title: "Active Services",
      value: data?.activeServices,
      icon: Briefcase,
    },
    {
      title: "Total Revenew",
      value: data?.totalRevenue,
      icon: DollarSign,
    },
    {
      title: "Total Staff",
      value: data?.activeStaff,
      icon: UserCog,
    },
  ];

  return (
    <div className="space-y-6">
      <DynamicHeader
        title={"Admin Dashboard"}
        des="Overview of your concierge business"
      />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <StatsCard stats={stats} />
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <ServiceRequestChart data={data?.serviceRequests} />
            <RevenueChart data={data?.revenueTrend} />
          </div>
        </>
      )}
      <RecentServices />
    </div>
  );
}
