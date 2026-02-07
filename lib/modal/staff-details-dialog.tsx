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
import { useGetSingleStaffQuery } from "@/redux/features/service/staffApis";
import { useState } from "react";
import { StaffScheduleDialog } from "./staff-schedule-dialog";

type Staff = {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  bio: string;
  rating: number;
  services: number;
  status: "Active" | "Inactive";
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staffId: string;
};

const staffMock = {
  id: "1",
  name: "Maria Johnson",
  email: "maria@concierge.com",
  phone: "(555) 111-2222",
  specialty: "Home Cleaning",
  bio: "Experienced cleaner with 10+ years in the industry. Specializes in eco-friendly cleaning solutions.",
  rating: 4.9,
  services: 156,
  status: "Active",
};

export function StaffDetailsDialog({ open, onOpenChange, staffId }: Props) {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  console.log(staffId);
  const { data, isLoading } = useGetSingleStaffQuery(staffId);

  console.log("useGetSingleStaffQuery", data);

  const initials = data?.name
    ?.split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase() || "ST";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
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
        <div className="space-y-4 mt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Email</Label>
              <Input defaultValue={data?.email} />
            </div>

            <div className="space-y-1">
              <Label>Phone</Label>
              <Input defaultValue={data?.phone || "01945105450"} />
            </div>
          </div>

          <div className="space-y-1">
            <Label>Specialty</Label>
            <Input defaultValue={staffMock.specialty} />
          </div>

          <div className="space-y-1">
            <Label>Bio</Label>
            <Textarea
              rows={4}
              defaultValue={data?.bio || "bio not provide  "}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 bg-muted rounded-lg p-4 mt-6 text-center">
          <div>
            <p className="text-sm text-muted-foreground">Rating</p>
            <p className="font-semibold">
              {data?.rating || "5.0"} <span className="text-yellow-500">★</span>
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Services</p>
            <p className="font-semibold">{data?.services?.length}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Status</p>
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
          <Button className="flex-1">Save Changes</Button>

          <Button
            variant="outline"
            className="flex-1 gap-2"
            onClick={() => setIsScheduleOpen(true)}
          >
            <Calendar className="h-4 w-4" />
            View Schedule
          </Button>
        </DialogFooter>

        <StaffScheduleDialog
          open={isScheduleOpen}
          onOpenChange={setIsScheduleOpen}
          staffName={data?.name}
          specialty={staffMock.specialty}
        />
      </DialogContent>
    </Dialog>
  );
}
