"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  User,
  Clock,
  MapPin,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Appointment = {
  id: string;
  clientName: string;
  serviceName: string;
  time: string;
  location: string;
  status: "Completed" | "Pending" | "Cancelled";
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staffName: string | undefined;
  specialty: string | undefined;
};

const mockAppointments: Appointment[] = [
  {
    id: "1",
    clientName: "Lisa Anderson",
    serviceName: "Grocery Shopping",
    time: "10:00 AM - 11:30 AM",
    location: "Whole Foods Market",
    status: "Completed",
  },
  {
    id: "2",
    clientName: "Tom Harris",
    serviceName: "Grocery Shopping",
    time: "3:00 PM - 4:00 PM",
    location: "Trader Joe's",
    status: "Completed",
  },
];

export function StaffScheduleDialog({
  open,
  onOpenChange,
  staffName,
  specialty,
}: Props) {
  // Get initials for avatar
  const initials = staffName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "ST";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-[#F8F9FA] border-none shadow-xl">
        <DialogHeader className="items-start text-left">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-bold text-xl">
              {initials}
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-[#1E293B]">
                {staffName}'s Schedule
              </DialogTitle>
              <DialogDescription className="text-lg font-medium text-[#64748B]">
                {specialty}
              </DialogDescription>
            </div>
          </div>
          <p className="text-[#94A3B8] mt-2 font-normal">
            Weekly schedule view with all appointments and service bookings
          </p>
        </DialogHeader>

        {/* Navigation */}
        <div className="bg-[#E2E8F0]/50 p-2 rounded-xl flex items-center justify-between mt-4">
          <Button
            variant="ghost"
            className="bg-white hover:bg-white/80 text-[#475569] shadow-sm border border-[#E2E8F0] px-4"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous Week
          </Button>
          <span className="font-semibold text-[#475569]">This Week</span>
          <Button
            variant="ghost"
            className="bg-white hover:bg-white/80 text-[#475569] shadow-sm border border-[#E2E8F0] px-4"
          >
            Next Week
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Schedule List */}
        <div className="mt-6 border-2 border-[#1E293B] rounded-2xl p-6 bg-white min-h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold text-[#1E293B]">
                Tuesday, Oct 28
              </h3>
              <Badge className="bg-[#1E293B] hover:bg-[#1E293B] text-white rounded-md px-3 py-1 font-medium">
                Today
              </Badge>
            </div>
            <span className="text-[#94A3B8] border border-[#E2E8F0] px-3 py-1 rounded-lg text-sm">
              2 appointments
            </span>
          </div>

          <div className="space-y-4">
            {mockAppointments.map((appt) => (
              <div
                key={appt.id}
                className="border border-[#E2E8F0] rounded-xl p-5 space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#64748B]">
                      <User className="h-4 w-4" />
                    </div>
                    <span className="font-bold text-[#1E293B] text-lg">
                      {appt.clientName}
                    </span>
                    <Badge variant="secondary" className="bg-[#DCFCE7] text-[#15803D] hover:bg-[#DCFCE7] font-medium px-3 rounded-full">
                      {appt.status}
                    </Badge>
                  </div>
                  <span className="text-[#475569] font-medium">
                    {appt.serviceName}
                  </span>
                </div>

                <div className="space-y-2 text-[#64748B]">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-[15px]">{appt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-[15px]">{appt.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
