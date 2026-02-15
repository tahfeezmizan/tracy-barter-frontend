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
import { cn } from "@/lib/utils";
import { useGetWeeklyScheduleQuery } from "@/redux/features/service/staffApis";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  User,
} from "lucide-react";
import { useState } from "react";

type Booking = {
  _id: string;
  user: {
    name: string;
  };
  serviceType: {
    title: string;
  };
  address: {
    address: string;
    city: string;
  };
  date: string;
  startTime: string;
  endTime: string;
  status: string;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staffName: string | undefined;
  specialty: string | undefined;
  staffId: string | undefined;
};

export function StaffScheduleDialog({
  open,
  onOpenChange,
  staffName,
  specialty,
  staffId,
}: Props) {
  const [dateParam, setDateParam] = useState<string | undefined>(undefined);
  const { data, isLoading } = useGetWeeklyScheduleQuery(
    { date: dateParam, staffId },
    { skip: !staffId || !open }
  );

  const bookings: Booking[] = data?.data || [];

  // Group bookings by date
  const groupedBookings = bookings.reduce((acc: any, booking) => {
    const dateKey = new Date(booking.date).toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(booking);
    return acc;
  }, {});

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
          <span className="font-semibold text-[#475569]">
            {dateParam === "prev" ? "Previous Week" : dateParam === "next" ? "Next Week" : "This Week"}
          </span>
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
            <div className="flex items-center justify-center h-[300px]">
              <p className="text-[#64748B]">Loading schedule...</p>
            </div>
          ) : Object.keys(groupedBookings).length > 0 ? (
            <div className="space-y-8">
              {Object.entries(groupedBookings).map(([date, dayBookings]: [string, any]) => (
                <div key={date}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-[#1E293B]">{date}</h3>
                    </div>
                    <span className="text-[#94A3B8] border border-[#E2E8F0] px-3 py-1 rounded-lg text-sm">
                      {dayBookings.length} appointments
                    </span>
                  </div>

                  <div className="space-y-4">
                    {dayBookings.map((appt: Booking) => (
                      <div
                        key={appt._id}
                        className="border border-[#E2E8F0] rounded-xl p-5 space-y-4 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#64748B]">
                              <User className="h-4 w-4" />
                            </div>
                            <span className="font-bold text-[#1E293B] text-lg">
                              {appt.user.name}
                            </span>
                            <Badge
                              variant="secondary"
                              className={cn(
                                "font-medium px-3 rounded-full capitalize",
                                appt.status === "completed"
                                  ? "bg-[#DCFCE7] text-[#15803D] hover:bg-[#DCFCE7]"
                                  : appt.status === "scheduled" || appt.status === "pending"
                                  ? "bg-[#FEF9C3] text-[#854D0E] hover:bg-[#FEF9C3]"
                                  : "bg-red-100 text-red-700"
                              )}
                            >
                              {appt.status}
                            </Badge>
                          </div>
                          <span className="text-[#475569] font-medium">
                            {appt.serviceType.title}
                          </span>
                        </div>

                        <div className="space-y-2 text-[#64748B]">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span className="text-[15px]">
                              {appt.startTime} - {appt.endTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span className="text-[15px]">
                              {appt.address.address}, {appt.address.city}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] text-center space-y-2">
              <p className="text-xl font-bold text-[#1E293B]">No Appointments</p>
              <p className="text-[#64748B]">There are no scheduled services for this week.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
