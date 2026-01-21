"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ContactBusinessInformation from "@/components/user-profile/contact-businessIn-formation";
import PersonalInformation from "@/components/user-profile/personal-information";
import { useGetStaffProfileQuery } from "@/redux/features/staffdashboard/staffStatsApis";
import { Edit2, Upload } from "lucide-react";
import { useRef, useState } from "react";

export default function Page() {
  const { data } = useGetStaffProfileQuery(undefined);

  console.log("User data", data);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John",
    company: "Quality Home Services",
    avatar: "/images/john-avatar.jpg",
  });

  /* ---------- Handle Avatar Upload ---------- */
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileData((prev) => ({
        ...prev,
        avatar: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex items-center overflow-hidden max-w-7xl py-20 pt-24 lg:pt-16 mx-auto">
      <div className="w-full pt-10 space-y-6">
        {/* HEADER */}
        <div className="bg-linear-to-r from-slate-800 to-slate-900 rounded-lg p-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-yellow-400">
                <AvatarImage
                  src={profileData.avatar || "/placeholder.svg"}
                  alt={profileData.name}
                />
                <AvatarFallback className="text-2xl bg-slate-700 text-white">
                  {profileData.name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div>
                <h1 className="text-2xl font-bold text-white">{data?.name}</h1>
                <p className="text-slate-300 text-lg">{profileData.company}</p>
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
        <PersonalInformation />
        <ContactBusinessInformation />
      </div>
    </div>
  );
}
