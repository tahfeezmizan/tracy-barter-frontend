"use client";

import { useGetStaffProfileQuery } from "@/redux/features/staffdashboard/staffStatsApis";
import AccountSettings from "./account-settings";
import { PerformanceStats } from "./performance-stats";
import PersonalInformation from "./personal-information";
import ProviderProfile from "./provider-profile";

export default function ProfilePage() {
  const { data } = useGetStaffProfileQuery(undefined);

  return (
    <div className="space-y-10">
      <ProviderProfile data={data} />
      <div className="flex items-start justify-center gap-10">
        <div className="flex-1">
          <PersonalInformation data={data} />
        </div>
        <div className="flex-1 space-y-10">
          <PerformanceStats data={data} />
          <AccountSettings data={data} />
        </div>
      </div>
      {/* <Achievements /> */}
    </div>
  );
}
