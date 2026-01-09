import { StatsCardItem } from "@/config/Types/admin/adminType";

import LoadingSpinner from "@/lib/loading-spinner";
import {
  useGetAdminStatsQuery,
  useGetStaffStatsQuery,
} from "@/redux/features/admindashboard/adminStatsApis";
import { Briefcase, DollarSign, User, UserCog } from "lucide-react";
import RecentServices from "../admin/recent-services";
import RevenueChart from "../admin/revenue-chart";
import ServiceRequestChart from "../admin/service-request-chart";
import DynamicHeader from "../dynamic-header";
import StatsCard from "../stats-card";
import { useSelector } from "react-redux";
import { selectUserRole } from "@/redux/slice/userSlice";

export default function AdminDash() {
  const role = useSelector(selectUserRole);
  console.log(role);

  const { data, isLoading } = useGetAdminStatsQuery(undefined);

  const { data: staffData, isLoading: staffLoading } =
    useGetStaffStatsQuery(undefined);

  const statsAdmin: StatsCardItem[] = [
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

  const statsStaff: StatsCardItem[] = [
    {
      title: "Today's Services",
      value: staffData?.todayServices,
      icon: User,
    },
    {
      title: "Completed Services",
      value: staffData?.completedServices,
      icon: Briefcase,
    },
    {
      title: "Your Rating",
      value: staffData?.yourRating,
      icon: DollarSign,
    },
    {
      title: "This Week",
      value: staffData?.servicesThisWeek,
      icon: UserCog,
    },
  ];

  return (
    <div className="space-y-6">
      <DynamicHeader
        title={"Admin Dashboard"}
        des="Overview of your concierge business"
      />
      {isLoading || staffLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <StatsCard stats={role === "admin" ? statsAdmin : statsStaff} />

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
