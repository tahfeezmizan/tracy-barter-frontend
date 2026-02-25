import { StatsCardItem } from "@/config/Types/admin/adminType";

import LoadingSpinner from "@/lib/loading-spinner";
import {
  useGetAdminRecentServiceQuery,
  useGetAdminStatsQuery,
} from "@/redux/features/admindashboard/adminStatsApis";
import { Briefcase, DollarSign, User, UserCog } from "lucide-react";
import RecentServices from "../admin/recent-services";
import RevenueChart from "../admin/revenue-chart";
import ServiceRequestChart from "../admin/service-request-chart";
import DynamicHeader from "../dynamic-header";
import StatsCard from "../stats-card";
import { useSelector } from "react-redux";
import { selectUserRole } from "@/redux/slice/userSlice";
import {
  useGetStaffRecentServiceQuery,
  useGetStaffStatsQuery,
} from "@/redux/features/staffdashboard/staffStatsApis";
import { TodaysSchedule } from "../provider/today-schedule";

export default function AdminDash() {
  const role = useSelector(selectUserRole);
  // console.log(role);
  // admin
  const { data, isLoading } = useGetAdminStatsQuery(undefined);
  const { data: adminRecentService, isLoading: adminRecentLoading } =
    useGetAdminRecentServiceQuery(undefined);

  // staff
  const { data: staffData, isLoading: staffLoading } =
    useGetStaffStatsQuery(undefined);
  const { data: staffRecentService, isLoading: staffRecentLoading } =
    useGetStaffRecentServiceQuery(undefined);

  // console.log("staffRecentService", staffRecentService);

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
      title: "Total Revenue",
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
        title={role === "admin" ? "Admin Dashboard" : "Staff Portal"}
        des={
          role === "admin"
            ? "Overview of your concierge business"
            : "Here's your schedule for today"
        }
      />
      {isLoading || staffLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <StatsCard stats={role === "admin" ? statsAdmin : statsStaff} />

          {role === "admin" && (
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <ServiceRequestChart data={data?.serviceRequests} />
              <RevenueChart data={data?.revenueTrend} />
            </div>
          )}
        </>
      )}

      {role === "staff" && <TodaysSchedule />}

      <RecentServices
        data={role === "admin" ? adminRecentService : staffRecentService}
        loading={role === "admin" ? adminRecentLoading : staffRecentLoading}
      />
    </div>
  );
}
