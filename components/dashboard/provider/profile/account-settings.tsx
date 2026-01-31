"use client";

import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { useUpdateAvailabilityMutation } from "@/redux/features/staffdashboard/staffStatsApis";
import { StaffProfileResponse } from "@/lib/types/staff.types";
import Link from "next/link";
import { toast } from "sonner";

interface AccountSettingsProps {
  data?: StaffProfileResponse["data"];
}

const AccountSettings = ({ data }: AccountSettingsProps) => {
  // Initialize based on data?.status
  const [isAvailable, setIsAvailable] = useState(data?.status === "active");
  const [updateAvailability, { isLoading }] = useUpdateAvailabilityMutation();

  useEffect(() => {
    setIsAvailable(data?.status === "active");
  }, [data?.status]);

  const handleToggle = async () => {
    const newStatus = !isAvailable;
    // Optimistic update
    setIsAvailable(newStatus);
    console.log("Account Settings", newStatus);

    try {
      await updateAvailability({
        isAvailable: newStatus,
      }).unwrap();
      toast.success(`Availability updated to ${newStatus ? "available" : "unavailable"}`);
    } catch (error) {
      console.error("Failed to update availability:", error);
      toast.error("Failed to update availability. Please try again.");
      // Revert state on error
      setIsAvailable(!newStatus);
    }
  };

  return (
    <div className="p-6 bg-white text-black rounded-xl shadow-md">
      <h2 className="text-xl font-semibold">Account Settings</h2>
      <p className="text-gray-500 mb-4">Manage your account preferences</p>

      <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 mb-4">
        <div className="">
          <h3 className="font-medium">Availability Status</h3>
          <p className="text-sm text-gray-500">
            You are {isAvailable ? "available" : "not available"} for new
            service assignments
          </p>
        </div>
        <Switch
          checked={isAvailable}
          onCheckedChange={handleToggle}
          disabled={isLoading || data?.status === "inactive"}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="">
          <h3 className="font-medium">Change Password</h3>
          <p className="text-slate-500">Update your account password</p>
        </div>
        
        <Link href="/user-profile/change-password">
        <Button
          className="mt-2 px-4 py-2 bg-slate-100 border border-slate-200 text-black rounded-md hover:bg-primary hover:text-white"          
          >
          <Lock />
          Change Password
        </Button>
          </Link>
      </div>
    </div>
  );
};

export default AccountSettings;
