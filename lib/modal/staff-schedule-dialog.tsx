"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";

import {
  useGetStaffScheduleQuery,
} from "@/redux/features/service/staffApis";
import { useState } from "react";

type Appointment = {
  _id: string;
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
  staffId: string;
};

export function StaffScheduleDialog({
  open,
  onOpenChange,
  staffName,
  specialty,
  staffId,
}: Props) {
  const [dateParam, setDateParam] = useState<string | undefined>(undefined);
  const { data, isLoading } = useGetStaffScheduleQuery(
    { date: dateParam, staffId },
    { skip: !staffId || !open }
  );

  const scheduleData = data?.data || [];
  const weekRange = data?.weekRange || "This Week";

  // Get initials for avatar
  const initials =
    staffName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "ST";

  const handlePrev = () => setDateParam("prev");
  const handleNext = () => setDateParam("next");

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
            onClick={handlePrev}
            className="bg-white hover:bg-white/80 text-[#475569] shadow-sm border border-[#E2E8F0] px-4"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous Week
          </Button>
          <span className="font-semibold text-[#475569]">{weekRange}</span>
          <Button
            variant="ghost"
            onClick={handleNext}
            className="bg-white hover:bg-white/80 text-[#475569] shadow-sm border border-[#E2E8F0] px-4"
          >
            Next Week
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Schedule List */}
        <div className="mt-6 border-2 border-[#1E293B] rounded-2xl p-6 bg-white min-h-[400px] overflow-y-auto max-h-[60vh]">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-[#64748B]">Loading schedule...</p>
            </div>
          ) : scheduleData.length > 0 ? (
            <div className="space-y-6">
              {scheduleData.map((day: any) => (
                <div key={day.date}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-[#1E293B]">
                        {day.dateLabel || day.date}
                      </h3>
                      {day.isToday && (
                        <Badge className="bg-[#1E293B] hover:bg-[#1E293B] text-white rounded-md px-3 py-1 font-medium">
                          Today
                        </Badge>
                      )}
                    </div>
                    <span className="text-[#94A3B8] border border-[#E2E8F0] px-3 py-1 rounded-lg text-sm">
                      {day.appointments.length} appointments
                    </span>
                  </div>

                  <div className="space-y-4">
                    {day.appointments.map((appt: any) => (
                      <div
                        key={appt._id}
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
                            <Badge
                              variant="secondary"
                              className={cn(
                                "font-medium px-3 rounded-full",
                                appt.status === "Completed"
                                  ? "bg-[#DCFCE7] text-[#15803D] hover:bg-[#DCFCE7]"
                                  : "bg-[#FEF9C3] text-[#854D0E] hover:bg-[#FEF9C3]"
                              )}
                            >
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
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-2 py-20">
              <p className="text-xl font-bold text-[#1E293B]">No Appointments</p>
              <p className="text-[#64748B]">There are no scheduled services for this week.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
