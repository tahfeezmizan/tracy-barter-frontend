"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useStaffProfileUpdateMutation } from "@/redux/features/staffdashboard/staffStatsApis";
import { Camera, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AvatarBlock } from "../schedule/appointment-list";
import { getImageUrl } from "@/lib/utils";

export default function ProviderProfile({ data }) {
  const [file, setFile] = useState<File | null>(null);

  const [upload, { isLoading }] = useStaffProfileUpdateMutation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;
    setFile(selectedFile);
  };

  return (
    <Card className="w-full p-4 flex flex-col md:flex-row items-center justify-between bg-white rounded-xl gap-4">
      {/* LEFT SECTION */}
      <div className="flex items-center gap-4">
        {/* Profile Circle Initials */}

        <div className="">
          {data?.profile ? (
            <Image
              src={getImageUrl(data.profile)}
              alt={data?.name}
              width={200}
              height={200}
              className="w-12 h-12 rounded-full bg-[#0B1F3A]"
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

      {/* RIGHT SECTION - Change Photo button */}
      {/* <Button variant="outline" className="flex items-center gap-2">
        <Image
          src="/camera-icon.png" // replace with your icon path
          alt="camera icon"
          width={16}
          height={16}
        />
        Change Photo
      </Button> */}
      {/* <div className="flex items-center space-x-2 text-black">
        <label
          htmlFor="file-upload"
          className="flex items-center cursor-pointer"
        >
          <Button className="flex items-center space-x-2 px-4 py-2 border rounded-md bg-white hover:bg-gray-100">
            <Camera className="w-5 h-5" />
            <span>Change Photo</span>
          </Button>
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />
        {file && <div className="text-gray-600 text-sm">{file.name}</div>}
      </div> */}
      <div className="flex items-center space-x-2 text-black">
        {/* The entire box is now the clickable label */}
        <label
          htmlFor="file-upload"
          className="
      flex items-center space-x-2 
      px-4 py-2 
      border rounded-lg 
      bg-white hover:bg-gray-100 
      cursor-pointer
    "
        >
          <Camera className="w-5 h-5" />
          <span>Change Photo</span>
        </label>

        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />

        {file && <div className="text-gray-600 text-sm">{file.name}</div>}
      </div>
    </Card>
  );
}
