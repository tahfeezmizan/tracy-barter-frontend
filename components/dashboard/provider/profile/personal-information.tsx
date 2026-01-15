"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { StaffProfileResponse } from "@/lib/types/staff.types";
import { useStaffProfileUpdateMutation } from "@/redux/features/staffdashboard/staffStatsApis";

export default function PersonalInformation({ data }: StaffProfileResponse) {
  const [updateProfile, { isLoading }] = useStaffProfileUpdateMutation();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      specialty: "",
      address: "",
      bio: "",
    },
  });

  useEffect(() => {
    if (!data) return;

    reset({
      fullName: data?.name || "",
      email: data?.email || "",
      phone: data?.phone || "",
      specialty: data?.role || "",
      address: data?.location?.coordinates
        ? `Lat: ${data.location.coordinates[1]}, Lng: ${data.location.coordinates[0]}`
        : "",
      bio: data?.description || "",
    });
  }, [data, reset]);

  const onSubmit = async (formData: any) => {
    console.log("Personal Information Form Data:", formData);

    try {
      const res = await updateProfile({
        name: formData.fullName,
        description: formData.bio, // Changed from formData.description to formData.bio
        specialty: formData.specialty,
        phone: formData.phone,
      });

      console.log(res);

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full bg-white text-black p-6 rounded-xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Personal Information</h1>
        <p className="text-sm text-muted-foreground">
          Update your personal details
        </p>
      </div>

      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* FULL NAME */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="Maria Johnson"
              {...register("fullName")}
            />
          </div>

          {/* EMAIL */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                className="pl-10 bg-gray-100 cursor-not-allowed"
                placeholder="maria@concierge.com"
                readOnly
                {...register("email")}
              />
            </div>
          </div>

          {/* PHONE */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="phone"
                className="pl-10"
                placeholder="(555) 111-2222"
                {...register("phone")}
              />
            </div>
          </div>

          {/* SPECIALTY */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="specialty">Specialty</Label>
            <Input
              id="specialty"
              placeholder="Home Cleaning"
              {...register("specialty")}
            />
          </div>
        </div>

        {/* ADDRESS */}
        <div className="flex flex-col space-y-2">
          <Label htmlFor="address">Address</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="address"
              className="pl-10"
              placeholder="Enter your address"
              {...register("address")}
            />
          </div>
        </div>

        {/* BIO */}
        <div className="flex flex-col space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder="Tell clients about your experience and expertise..."
            rows={5}
            {...register("bio")}
          />
        </div>

        {/* BUTTON */}
        <Button className="mt-4 bg-[#F4C542]" type="submit">
          Save Changes
        </Button>
      </form>
    </div>
  );
}
