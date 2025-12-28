/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useState, memo } from "react";
import { 
  User, 
  MapPin, 
  Briefcase,
  Camera
} from "lucide-react";
import ChangePassword from "./change-password";
import type { EditProfilePageProps, ProfileData, FileInputChangeEvent, FormInputChangeEvent } from "./types";

/** Default profile data template */
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
 * EditProfilePage Component
 * Comprehensive profile editing form with multiple sections
 * Displays different form states based on editing mode
 *
 * @component
 */
function EditProfilePage({ isEditing, setIsEditing, onSave }: EditProfilePageProps) {
  const [profileData, setProfileData] = useState<ProfileData>(DEFAULT_PROFILE_DATA);

  const handleInputChange = useCallback((e: FormInputChangeEvent) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleImageChange = useCallback((e: FileInputChangeEvent) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({
          ...prev,
          profileImage: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  }, []);


  return (
    <div className="pb-12">
      {/* Main Content */}
      <div className="mx-auto py-8">
        <div className="space-y-6">
          {/* Profile Image Section */}
          <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-md border border-blue-100 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <div className="bg-blue-500 p-2 rounded-lg">
                <Camera className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              Profile Photo
            </h3>
            
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Image Preview */}
              <div className="flex-shrink-0">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                    <img 
                      src={profileData.profileImage} 
                      alt="User profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <label className="cursor-pointer">
                        <div className="flex flex-col items-center gap-2">
                          <Camera className="w-8 h-8 text-white" aria-hidden="true" />
                          <span className="text-white text-sm font-medium">Change Photo</span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          aria-label="Upload new profile photo"
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Upload Info */}
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Upload New Photo</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Hover over the image and click to select a new profile photo. Recommended size: 400x400px
                      </p>
                    </div>
                    <label className="flex items-center gap-3 px-6 py-3 bg-white border-2 border-dashed border-blue-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition group">
                      <Camera className="w-5 h-5 text-blue-500 group-hover:text-blue-600" aria-hidden="true" />
                      <div>
                        <span className="text-sm font-medium text-gray-900">Click to upload</span>
                        <p className="text-xs text-gray-500">JPG, PNG, GIF up to 5MB</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        aria-label="Upload profile photo"
                      />
                    </label>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-gray-600">
                      Click the Edit Profile button above to update your profile photo.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Personal Information Section */}
          <section className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <User className="w-5 h-5" aria-hidden="true" />
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
                disabled={!isEditing}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
              <p className="text-xs text-gray-500">
                Brief description about yourself and your experience
              </p>
            </div>
          </section>

          {/* Address Section */}
          <section className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5" aria-hidden="true" />
              Address Information
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">
                  Street Address
                </label>
                <input
                  id="streetAddress"
                  type="text"
                  name="streetAddress"
                  value={profileData.streetAddress}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    name="city"
                    value={profileData.city}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <input
                    id="state"
                    type="text"
                    name="state"
                    value={profileData.state}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                    ZIP Code
                  </label>
                  <input
                    id="zipCode"
                    type="text"
                    name="zipCode"
                    value={profileData.zipCode}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <input
                  id="country"
                  type="text"
                  name="country"
                  value={profileData.country}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>
          </section>

          {/* Business Information Section */}
          <section className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Briefcase className="w-5 h-5" aria-hidden="true" />
              Business Information
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                  Business Name
                </label>
                <input
                  id="businessName"
                  type="text"
                  name="businessName"
                  value={profileData.businessName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                  Website
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">https://</span>
                  <input
                    id="website"
                    type="text"
                    name="website"
                    value={profileData.website}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700">
                  License Number
                </label>
                <input
                  id="licenseNumber"
                  type="text"
                  name="licenseNumber"
                  value={profileData.licenseNumber}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
                <p className="text-xs text-gray-500">
                  Your professional license or registration number
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="pt-6">
          <ChangePassword />
        </div>
      </div>
    </div>
  );
}

export default memo(EditProfilePage);
