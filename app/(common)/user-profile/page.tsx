"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import PersonalInformation from "@/components/user-profile/personal-information";
import {
  useGetStaffProfileQuery,
  useStaffProfileUpdateMutation,
} from "@/redux/features/staffdashboard/staffStatsApis";
import { Edit2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { getImageUrl } from "@/lib/utils";

export default function Page() {
  const { data } = useGetStaffProfileQuery(undefined);
  console.log(data);

  const [upload] = useStaffProfileUpdateMutation();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

  /* ---------- Handle Avatar Upload (API CONNECTED) ---------- */
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("images", file);

    try {
      const res = await upload(formData).unwrap();
      if (res?.success) {
        toast.success(res?.message);
        setIsEditingAvatar(false);
      }
    } catch (error) {
      console.error("Avatar upload failed:", error);
      toast.error("Failed to update profile photo");
    }
  };

  return (
    <div className="flex items-center overflow-hidden max-w-7xl mx-auto px-4 xl:px-0 py-10 md:py-20 md:pt-24 lg:pt-16">
      <div className="w-full pt-10 space-y-6">
        {/* HEADER */}
        <div className="bg-linear-to-r from-slate-800 to-slate-900 rounded-lg p-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-yellow-400">
                <AvatarImage
                  src={
                    data?.profile
                      ? getImageUrl(data?.profile)
                      : "/placeholder.svg"
                  }
                  alt={data?.name}
                />
                <AvatarFallback className="text-2xl bg-slate-700 text-white">
                  {data?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div>
                <h1 className="text-2xl font-bold text-white">{data?.name}</h1>
                {/* <p className="text-slate-300 text-lg">Quality Home Services</p> */}
              </div>
            </div>

            {/* ACTION BUTTON */}
            {!isEditingAvatar ? (
              <Button
                onClick={() => setIsEditingAvatar(true)}
                className="gap-2 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold"
              >
                <Edit2 size={18} />
                Edit Profile
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="gap-2 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold"
                >
                  <Upload size={18} />
                  Upload Photo
                </Button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleAvatarChange}
                />
              </>
            )}
          </div>
        </div>

        {/* SECTIONS */}
        <PersonalInformation data={data} />
      </div>
    </div>
  );
}
