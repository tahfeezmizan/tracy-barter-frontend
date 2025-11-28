import React from "react";
import ReferralTable from "./referral-table";
import DynamicHeader from "../../dynamic-header";

export default function ReferralPage() {
  return (
    <div>
      <DynamicHeader title={"Referee"} des="Manage your client database" />
      <ReferralTable />
    </div>
  );
}
