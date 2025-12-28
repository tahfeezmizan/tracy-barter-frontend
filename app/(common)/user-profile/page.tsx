"use client";

import { useCallback, useState } from "react";
import EditProfilePage from "@/components/profile/edit-profile";
import UserProfile from "@/components/profile/user-profile";
import type { ProfileData } from "@/components/profile/types";

/** Default profile data for demonstration */
const DEFAULT_PROFILE_DATA: ProfileData = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  streetAddress: "123 Main Street",
  city: "New York",
  state: "NY",
  zipCode: "10001",
  country: "United States",
  businessName: "Quality Home Services",
  website: "www.qualityhomeservices.com",
  licenseNumber: "HS-2024-001234",
  bio: "Professional service provider with 5+ years of experience in home services.",
  profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
};

/**
 * User Profile Page
 * Main layout component for user profile management
 * Integrates profile display and edit functionality
 *
 * @component
 */
export default function Page() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>(DEFAULT_PROFILE_DATA);

  const handleSaveProfile = useCallback((data: ProfileData) => {
    setProfileData(data);
    setIsEditing(false);
  }, []);

  return (
    <div className="flex items-center overflow-hidden max-w-7xl pt-24 lg:pt-16 mx-auto">
      <div className="w-full pt-10">
        <UserProfile 
          isEditing={isEditing} 
          setIsEditing={setIsEditing} 
          profileData={profileData} 
        />
        <EditProfilePage 
          isEditing={isEditing} 
          setIsEditing={setIsEditing} 
          onSave={handleSaveProfile} 
        />
      </div>
    </div>
  );
}
