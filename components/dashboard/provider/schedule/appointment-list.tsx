"use client";

import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/lib/loading-spinner";
import { AppointmentsBooking } from "@/lib/types/schedule.types";
import { formatDate, formatDateOnly } from "@/lib/utils";
import { useUpdateBookingStatusMutation } from "@/redux/features/staffdashboard/staffStatsApis";
import {
  CheckCircle,
  CircleUserRound,
  Clock9,
  Eye,
  MapPin,
  Phone,
  Play,
} from "lucide-react";
import React from "react";
import { toast } from "sonner";

const AvatarBlock: React.FC<{
  name?: string;
  colorClass?: string;
}> = ({ name, colorClass = "bg-slate-700" }) => {
  const getInitials = (name?: string) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0]?.toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  return (
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-full ${colorClass} text-white font-semibold text-sm mr-4 shrink-0`}
    >
      {getInitials(name)}
    </div>
  );
};

const STATUS_COLOR = {
  confirmed: "bg-purple-100 text-purple-700 border-purple-200",
  scheduled: "bg-yellow-100 text-yellow-700 border-yellow-200",
  inProgress: "bg-blue-100 text-blue-700 border-blue-200",
  completed: "bg-green-100 text-green-700 border-green-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
  requested: "bg-gray-100 text-gray-700 border-gray-300",
};

export default function AppointmentList({
  data,
  date,
  loading,
}: {
  data: AppointmentsBooking[];
  date: Date | string;
  loading: boolean;
  
}) {
  console.log("data", data);
  const [updateBookingStatus, { isLoading }] = useUpdateBookingStatusMutation();

  const handleUpdateStatus = async (
    bookingId: string,
    currentStatus: string
  ) => {
    let nextStatus = "";

    if (currentStatus === "scheduled") {
      nextStatus = "inProgress";
    } else if (currentStatus === "inProgress") {
      nextStatus = "completed";
    } else {
      return;
    }

    try {
      const res = await updateBookingStatus({
        bookingId,
        status: nextStatus,
      }).unwrap();

      toast.success(
        nextStatus === "inProgress"
          ? "Service started successfully"
          : "Service completed successfully"
      );

      console.log("API Response", res);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update booking status");
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl">
      <div className="max-w-3xl mx-auto">
        <header className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900">
            Appointments for {formatDate(date)}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {data?.length} appointments scheduled
          </p>
        </header>

        <main>
          {loading ? (
            <LoadingSpinner />
          ) : !data || data.length === 0 ? (
            <div className="text-center text-lg text-gray-400 py-6">
              Appointments not found for this date.
            </div>
          ) : (
            <div className="">
              {data?.map((appointment: AppointmentsBooking) => (
                <div
                  key={appointment?._id}
                  className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 w-full mb-4"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start grow min-w-0">
                      <AvatarBlock
                        name={appointment?.user?.name}
                        colorClass={appointment?.avatarColor}
                      />

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {appointment?.serviceType?.title}
                        </h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                          <CircleUserRound size={16} />
                          <span className="truncate">
                            {appointment?.user?.name}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="ml-4 shrink-0">
                      <span
                        className={`text-xs px-2 py-1 rounded-full  border capitalize ${
                          STATUS_COLOR[
                            appointment?.status as keyof typeof STATUS_COLOR
                          ] ?? "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {appointment?.status?.replace(/([A-Z])/g, " $1")}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-3 sm:gap-x-4 text-sm text-gray-700 mt-2">
                    <div className="flex items-center gap-1">
                      <Clock9 size={16} />
                      <span className="truncate">
                        {formatDateOnly(appointment?.date)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      <span className="truncate">
                        {appointment?.address?.address}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone size={16} />
                      <span className="truncate">
                        {appointment?.user?.phone}
                      </span>
                    </div>
                  </div>

                  <div className="my-5 border-t border-gray-100"></div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 inline-flex items-center justify-center gap-1 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-gray-50 text-gray-700 hover:bg-gray-100 h-10 px-4 py-2 border border-gray-200">
                      <Eye size={16} />
                      View Details
                    </button>

                    {(appointment?.status === "scheduled" ||
                      appointment?.status === "inProgress") && (
                      <Button
                        disabled={isLoading}
                        onClick={() =>
                          handleUpdateStatus(
                            appointment?._id,
                            appointment?.status
                          )
                        }
                        className="flex-1 flex items-center gap-1 px-4 py-2 rounded-lg text-sm text-white bg-secondary hover:bg-primary"
                      >
                        {appointment?.status === "scheduled" ? (
                          <Play size={16} />
                        ) : (
                          <CheckCircle size={16} />
                        )}

                        {appointment?.status === "scheduled"
                          ? "Start Service"
                          : "Complete Service"}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        <footer className="mt-8 text-center text-sm text-gray-400">
          End of day's schedule. Data provided by App Scheduling Service.
        </footer>
      </div>
    </div>
  );
}
