"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

const AccountSettings = () => {
  const [isAvailable, setIsAvailable] = useState(true);

  const handleToggle = () => {
    setIsAvailable((prevState) => !prevState);
  };

  return (
    <div className="max-w-1/2 p-6 bg-white text-black rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
      <p className="text-gray-500 mb-6">Manage your account preferences</p>

      <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 mb-6">
        <div className="">
          <h3 className="font-medium">Availability Status</h3>
          <p className="text-sm text-gray-500">
            You are {isAvailable ? "available" : "not available"} for new
            service assignments
          </p>
        </div>
        <Switch checked={isAvailable} onCheckedChange={handleToggle} />
      </div>

      <div className="flex items-center justify-between">
        <div className="">
          <h3 className="font-medium">Change Password</h3>
          <p className="text-slate-500">Update your account password</p>
        </div>
        <Button
          className="mt-2 px-4 py-2 bg-slate-100 border border-slate-200 text-black rounded-md hover:bg-primary hover:text-white"
          onClick={() => alert("Change password functionality")}
        >
          <Lock />
          Change Password
        </Button>
      </div>
    </div>
  );
};

export default AccountSettings;
