"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useStaffProfileUpdateMutation } from "@/redux/features/staffdashboard/staffStatsApis";
import { Camera, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AvatarBlock } from "../schedule/appointment-list";
import { getImageUrl } from "@/lib/utils";
import { StaffProfileResponse } from "@/lib/types/staff.types";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

interface ProviderProfileProps {
  data?: StaffProfileResponse["data"];
}

export default function ProviderProfile({ data }: ProviderProfileProps) {
  // console.log("profile", data);
  const [file, setFile] = useState<File | null>(null);

  const [upload] = useStaffProfileUpdateMutation();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile = event.target.files?.[0] ?? null;
    if (!selectedFile) return;

    setFile(selectedFile);

    // Create FormData
    const formData = new FormData();
    formData.append("images", selectedFile);

    // console.log(selectedFile);

    try {
      const res = await upload(formData).unwrap();
      if (res?.success) {
        toast.success(res?.message);
      }
      // console.log("ProviderProfile", res);
    } catch (error) {
      console.error("Profile upload failed:", error);
    }
  };

  return (
    <Card className="w-full p-4 flex flex-col md:flex-row items-center justify-between bg-white rounded-xl gap-4">
      {/* LEFT SECTION */}
      <div className="flex items-center gap-4">
        {/* Profile Circle Initials */}
        <div className="w-16 h-16 rounded-full">
          {data?.profile ? (
            <Image
              src={getImageUrl(data?.profile)}
              alt={data?.name}
              width={500}
              height={500}
              className="w-16 h-16 rounded-full bg-[#0B1F3A]"
            />
          ) : (
            <AvatarBlock name={data?.name} />
          )}
        </div>

        <div>
          {/* Name */}
          <h2 className="capitalize font-medium text-black text-lg">
            {data?.name}
          </h2>

          {/* Tags */}
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary" className="bg-[#0F1C33] text-white">
              Home Cleaning
            </Badge>

            <Badge className="bg-green-500 text-white capitalize">
              {data?.status}
            </Badge>
          </div>

          {/* Stats Row */}
          <div className="flex gap-4 mt-2 text-sm text-gray-600">
            {/* Rating */}
            <div className="flex items-center gap-1">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span>{data?.avgRating} Rating</span>
            </div>

            {/* Services Completed */}
            <div className="flex items-center gap-1">
              <span className="font-semibold">
                {data?.completedServiceCount}
              </span>
              <span>Services Completed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2 text-black">
        <label
          htmlFor="file-upload"
          className="flex items-center space-x-2 px-4 py-2 border rounded-lg bg-white hover:bg-gray-100 cursor-pointer"
        >
          <Camera className="w-5 h-5" />
          <span>Change Photo</span>
        </label>

        <Input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </Card>
  );
}
