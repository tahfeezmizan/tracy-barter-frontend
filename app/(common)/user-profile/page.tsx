"use client";

import { useState } from "react";
import EditProfilePage from "@/components/profile/edit-profile";
import UserProfile from "@/components/profile/user-profile";

export default function Page() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    // Personal Information
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    
    // Address
    streetAddress: "123 Main Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
    
    // Business
    businessName: "Quality Home Services",
    website: "www.qualityhomeservices.com",
    licenseNumber: "HS-2024-001234",
    
    // Profile
    bio: "Professional service provider with 5+ years of experience in home services.",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  });

  const handleSaveProfile = (data: any) => {
    setProfileData(data);
  };

  return (
    <div className="flex items-center overflow-hidden max-w-7xl pt-24 lg:pt-16 mx-auto">
      <div className="w-full pt-10">
        <UserProfile isEditing={isEditing} setIsEditing={setIsEditing} profileData={profileData} />
        <EditProfilePage isEditing={isEditing} setIsEditing={setIsEditing} onSave={handleSaveProfile} />
        {/* <ChangePassword /> */}
      </div>
    </div>
  );
}
