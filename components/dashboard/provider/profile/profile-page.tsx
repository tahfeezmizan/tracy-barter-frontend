import React from "react";
import PersonalInformation from "./personal-information";
import ProviderProfile from "./provider-profile";
import { PerformanceStats } from "./performance-stats";
import { Achievements } from "./achievements";
import AccountSettings from "./account-settings";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <ProviderProfile />
      <PersonalInformation />
      <PerformanceStats />
      <Achievements />
      <AccountSettings />
    </div>
  );
}
