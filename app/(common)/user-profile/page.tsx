"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import PersonalInformation from "@/components/user-profile/personal-information";
import { EditProfileModal } from "@/lib/modal/edit-profile-modal";
import { getImageUrl } from "@/lib/utils";
import {
  useGetStaffProfileQuery
} from "@/redux/features/staffdashboard/staffStatsApis";
import { Edit2 } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const { data } = useGetStaffProfileQuery(undefined);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
            <Button
              onClick={() => setIsEditModalOpen(true)}
              className="gap-2 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold"
            >
              <Edit2 size={18} />
              Edit Profile
            </Button>
          </div>
        </div>

        {/* SECTIONS */}
        <PersonalInformation data={data} />
        <EditProfileModal
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          user={data}
        />
      </div>
    </div>
  );
}
