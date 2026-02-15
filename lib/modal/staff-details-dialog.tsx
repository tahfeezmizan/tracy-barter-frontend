"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import {
  useGetSingleStaffQuery,
  useGetStaffSpecialtyServicesQuery,
  useUpdateStaffMutation,
} from "@/redux/features/service/staffApis";
import { useState, useEffect } from "react";
import { StaffScheduleDialog } from "./staff-schedule-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type SelectedItem = {
  _id: string;
  name: string;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staffId: string;
};

const staffMock = {
  specialty: "Home Cleaning",
  status: "Active",
};

export function StaffDetailsDialog({ open, onOpenChange, staffId }: Props) {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const { data } = useGetSingleStaffQuery(staffId);
  const { data: specialties = [] } =
    useGetStaffSpecialtyServicesQuery(undefined);

    // console.log("data", staffId)

  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);

  const [updateStaff] = useUpdateStaffMutation();

  const {
    register,
    handleSubmit,
    setValue,
  } = useForm();

  // Set default values when API loads
  useEffect(() => {
    if (data) {
      setValue("email", data?.email || "");
      setValue("phone", data?.phone || "");
      setValue("bio", data?.bio || "");
      setSelectedSpecialties(data?.services?.map((s: any) => s._id || s) || []); // Map to IDs
    }
  }, [data, setValue]);

  const toggleSpecialty = (id: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(id)
        ? prev.filter((v) => v !== id)
        : [...prev, id]
    );
  };

  const selectedNames = specialties
    .filter((item: SelectedItem) =>
      selectedSpecialties.includes(item._id)
    )
    .map((item: SelectedItem) => item.name)
    .join(", ");

  const initials =
    data?.name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase() || "ST";

  const onSubmit = async (formData: any) => {
    const updatedData = {
      name: data?.name,
      email: formData?.email,
      services: selectedSpecialties,
      bio: formData?.bio,
      phone: formData?.phone,
      id: staffId,
    };

    try {
      const res: any = await updateStaff(updatedData);
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        onOpenChange(false);
      }
    } catch {
      
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl gap-0">
        <DialogHeader>
          <DialogTitle>Staff Member Details</DialogTitle>
          <DialogDescription>
            View and edit staff member information
          </DialogDescription>
        </DialogHeader>

        {/* Profile */}
        <div className="flex items-center gap-4 mt-4">
          <div className="h-14 w-14 rounded-full bg-slate-900 text-white flex items-center justify-center font-semibold">
            {initials}
          </div>
          <div>
            <p className="font-semibold">{data?.name}</p>
            <p className="text-sm text-muted-foreground">
              {staffMock.specialty}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 mt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Email</Label>
                <Input {...register("email")} />
              </div>

              <div className="space-y-1">
                <Label>Phone</Label>
                <Input {...register("phone")} />
              </div>
            </div>

            {/* Specialty Dropdown */}
            <div className="space-y-1">
              <Label>Specialty</Label>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-start truncate"
                  >
                    {selectedNames || "Select specialty"}
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="bg-white">
                  {specialties.map((item: SelectedItem) => (
                    <DropdownMenuCheckboxItem
                      key={item._id}
                      checked={selectedSpecialties.includes(item._id)}
                      onCheckedChange={() =>
                        toggleSpecialty(item._id)
                      }
                    >
                      {item.name}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-1">
              <Label>Bio</Label>
              <Textarea
                rows={4}
                {...register("bio")}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 bg-muted rounded-lg p-4 mt-6 text-center">
            <div>
              <p className="text-sm text-muted-foreground">
                Rating
              </p>
              <p className="font-semibold">
                {data?.rating || "5.0"}{" "}
                <span className="text-yellow-500">★</span>
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Services
              </p>
              <p className="font-semibold">
                {data?.services?.length}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Status
              </p>
              <Badge
                className={
                  data?.status === "active"
                    ? "bg-green-600 text-white"
                    : "bg-gray-500"
                }
              >
                {staffMock.status}
              </Badge>
            </div>
          </div>

          <DialogFooter className="mt-6 flex gap-2">
            <Button type="submit" className="flex-1">
              Save Changes
            </Button>

            <Button
              type="button"
              variant="outline"
              className="flex-1 gap-2"
              onClick={() => setIsScheduleOpen(true)}
            >
              <Calendar className="h-4 w-4" />
              View Schedule
            </Button>
          </DialogFooter>
        </form>

        <StaffScheduleDialog
          open={isScheduleOpen}
          onOpenChange={setIsScheduleOpen}
          staffName={data?.name}
          specialty={staffMock.specialty}
          staffId={staffId}
        />
      </DialogContent>
    </Dialog>
  );
}
