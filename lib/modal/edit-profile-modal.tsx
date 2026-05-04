"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Loader2 } from "lucide-react";
import Image from "next/image";
import { useStaffProfileUpdateMutation } from "@/redux/features/staffdashboard/staffStatsApis";
import { toast } from "sonner";

interface EditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: any;
}

export function EditProfileModal({
  open,
  onOpenChange,
  user,
}: EditProfileModalProps) {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [updateProfile, { isLoading }] = useStaffProfileUpdateMutation();

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImagePreview(user.profile || "");
    }
  }, [user, open]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    if (imageFile) {
      formData.append("images", imageFile);
    }

    try {
      await updateProfile(formData).unwrap();
      toast.success("Profile updated successfully");
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="flex flex-col items-center gap-4">
            <div
              className="relative cursor-pointer group"
              onClick={handleImageClick}
            >
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-colors">
                <Image
                  src={
                    imagePreview ||
                    "https://scontent.fdac207-1.fna.fbcdn.net/v/t39.30808-6/571188182_10107312777622138_146878389789160457_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=MsKx_yNEBQMQ7kNvwHvDLCx&_nc_oc=Ado2dGIln1GuRWhxXfeMkOJK7ID3zFQIH0G8CFbLugZihscK4Wd4qwjvLj-jTfqFMfc&_nc_zt=23&_nc_ht=scontent.fdac207-1.fna&_nc_gid=TNfu6H99rhC5N_BNFqYE_g&_nc_ss=7b2a8&oh=00_Af6mSdUoQdlIxPATTCp8I9mwYDzcUiFnkOElgngibvUlZw&oe=69FEEC01"
                  }
                  alt="Profile"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                <Camera className="text-white w-8 h-8" />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Click image to upload new profile picture
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Full Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="h-10"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-10"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="h-10 min-w-[120px]">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
