"use client";

import { useState } from "react";
import EditProfilePage from "@/components/profile/edit-profile";
import UserProfile from "@/components/profile/user-profile";

export default function Page() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex items-center overflow-hidden max-w-7xl pt-24 lg:pt-16 mx-auto">
      <div className="w-full pt-10">
        <UserProfile isEditing={isEditing} setIsEditing={setIsEditing} />
        <EditProfilePage isEditing={isEditing} setIsEditing={setIsEditing} />
        {/* <ChangePassword /> */}
      </div>
    </div>
  );
}
