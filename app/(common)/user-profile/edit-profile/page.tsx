"use client";

import { useState } from "react";
import EditProfilePage from "@/components/profile/edit-profile";

/**
 * Edit Profile Page
 * Dedicated route for editing user profile with full screen layout
 *
 * @component
 */
export default function Page() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex items-center overflow-hidden max-w-7xl pt-24 lg:pt-16 mx-auto">
      <EditProfilePage 
        isEditing={isEditing} 
        setIsEditing={setIsEditing} 
      />
    </div>
  );
}