"use client";

import { memo, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, User, X, Save } from "lucide-react";
import type { UserProfileProps } from "./types";

/**
 * UserProfile Component
 * Displays user profile header with personal information and action buttons
 * Supports edit/save and cancel operations
 *
 * @component
 */
function UserProfile({ isEditing, setIsEditing, profileData }: UserProfileProps) {
  const handleSave = useCallback(() => {
    // Log all profile data to console
    console.log("All Profile Data:", profileData);
    setIsEditing(false);
  }, [profileData, setIsEditing]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
  }, [setIsEditing]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, [setIsEditing]);

  return (
    <Card className="w-full p-4 flex flex-col md:flex-row items-center justify-between bg-[#1A2332] rounded-xl gap-4">
      {/* LEFT SECTION */}
      <div className="flex items-center gap-4">
        {/* Profile Circle Initials */}
        <div className="w-16 h-16 rounded-full bg-[#0F1C33] flex items-center justify-center">
          <span className="text-white font-semibold text-xl">MJ</span>
        </div>

        <div>
          {/* Name */}
          <h2 className="font-medium text-white text-lg">Maria Johnson</h2>

          {/* Tags */}
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary" className="bg-[#0F1C33] text-white">
              Home Cleaning
            </Badge>

            <Badge className="bg-green-500 text-white">Available</Badge>
          </div>

          {/* Stats Row */}
          <div className="flex gap-4 mt-2 text-sm text-gray-400">
            {/* Rating */}
            <div className="flex items-center gap-1">
              <Star size={14} className="" />
              <span>4.9 Rating</span>
            </div>

            {/* Services Completed */}
            <div className="flex items-center gap-1">
              <span className="font-semibold">156</span>
              <span>Services Completed</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION - Edit Button */}
      <div className="flex gap-3">
        {isEditing ? (
          <>
            <Button
              onClick={handleCancel}
              variant="outline"
              className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
              aria-label="Cancel profile editing"
            >
              <X className="w-4 h-4" aria-hidden="true" />
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex items-center gap-2 bg-[#F4C542] hover:bg-[#F4C542]/90"
              aria-label="Save profile changes"
            >
              <Save className="w-4 h-4" aria-hidden="true" />
              Save Changes
            </Button>
          </>
        ) : (
          <Button
            onClick={handleEdit}
            className="flex items-center gap-2 bg-[#F4C542] hover:bg-[#F4C542]/90"
            aria-label="Edit profile information"
          >
            <User className="w-4 h-4" aria-hidden="true" />
            Edit Profile
          </Button>
        )}
      </div>
    </Card>
  );
}

export default memo(UserProfile);
