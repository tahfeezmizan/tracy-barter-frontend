/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, User, X, Save } from "lucide-react";

interface UserProfileProps {
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  profileData?: any;
}

export default function UserProfile({ isEditing, setIsEditing, profileData }: UserProfileProps) {
  const handleSave = () => {
    // Log all profile data to console
    console.log("All Profile Data:", profileData);
    setIsEditing(false);
  };

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
              onClick={() => setIsEditing(false)}
              variant="outline"
              className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <X className="w-4 h-4" />
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex items-center gap-2 bg-[#F4C542] hover:bg-[#F4C542]/90"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </>
        ) : (
          <Button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-[#F4C542] hover:bg-[#F4C542]/90"
          >
            <User className="w-4 h-4" />
            Edit Profile
          </Button>
        )}
      </div>
    </Card>
  );
}
