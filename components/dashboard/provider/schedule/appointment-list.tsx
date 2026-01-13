"use client";

import React from "react";
import AppointmentCard from "./appointment-card";
import {
  CirclePlay,
  CircleUserRound,
  Clock9,
  Eye,
  MapPin,
  Phone,
} from "lucide-react";

interface Appointment {
  id: string;
  service: string;
  customerName: string;
  initials: string;
  avatarColor: string;
  time: string;
  location: string;
  phone: string;
  status: "confirmed" | "pending" | "canceled";
}

const mockAppointments: Appointment[] = [
  {
    id: "a1",
    service: "Home Maintenance",
    customerName: "Robert Taylor",
    initials: "RT",
    avatarColor: "bg-slate-700",
    time: "9:00 AM - 11:00 AM",
    location: "321 Elm Street, Springfield",
    phone: "(555) 456-7890",
    status: "confirmed",
  },
  {
    id: "a2",
    service: "Home Cleaning",
    customerName: "Amanda Lee",
    initials: "AL",
    avatarColor: "bg-blue-600",
    time: "1:00 PM - 3:00 PM",
    location: "654 Birch Lane, Springfield",
    phone: "(555) 567-8901",
    status: "confirmed",
  },
  {
    id: "a3",
    service: "Plumbing Repair",
    customerName: "Carlos Ramirez",
    initials: "CR",
    avatarColor: "bg-indigo-600",
    time: "4:00 PM - 5:30 PM",
    location: "10 Downing St, Anytown",
    phone: "(555) 123-4567",
    status: "pending",
  },
];

const AvatarBlock: React.FC<{ initials: string; colorClass: string }> = ({
  initials,
  colorClass,
}) => (
  <div
    className={`flex h-10 w-10 items-center justify-center rounded-full ${colorClass} text-white font-semibold text-sm mr-4 shrink-0`}
  >
    {initials}
  </div>
);

const getStatusBadge = (status: Appointment["status"]) => {
  switch (status) {
    case "confirmed":
      return (
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">
          Confirmed
        </span>
      );
    case "pending":
      return (
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200">
          Pending
        </span>
      );
    default:
      return null;
  }
};

export default function AppointmentList({
  data,
  date,
  loading,
}: {
  data: any;
  date: Date | undefined;
  loading: boolean;
}) {
  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  console.log(data);

  return (
    <div className="p-6 bg-white rounded-xl">
      <div className="max-w-3xl mx-auto">
        <header className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900">
            Appointments for {formatDate(date)}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {mockAppointments.length} appointments scheduled
          </p>
        </header>

        <main>
          {data?.map((appointment: any) => (
            <div
              key={appointment?._id}
              className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 w-full mb-4"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start grow min-w-0">
                  <AvatarBlock
                    initials={appointment?.initials}
                    colorClass={appointment?.avatarColor}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {appointment?.service}
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                      <CircleUserRound size={16} />
                      <span className="truncate">{appointment?.user?.name}</span>
                    </p>
                  </div>
                </div>

                <div className="ml-4 shrink-0">
                  {getStatusBadge(appointment?.status)}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-3 sm:gap-x-4 text-sm text-gray-700 mt-2">
                <div className="flex items-center gap-1">
                  <Clock9 size={16} />
                  <span className="truncate">{appointment?.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  <span className="truncate">{appointment?.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone size={16} />
                  <span className="truncate">{appointment?.phone}</span>
                </div>
              </div>

              <div className="my-5 border-t border-gray-100"></div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 inline-flex items-center justify-center gap-1 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-gray-50 text-gray-700 hover:bg-gray-100 h-10 px-4 py-2 border border-gray-200">
                  <Eye size={16} />
                  View Details
                </button>

                <button className="flex-1 inline-flex items-center justify-center gap-1 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-slate-900 text-white hover:bg-slate-800 h-10 px-4 py-2">
                  <CirclePlay size={16} />
                  Start Service
                </button>
              </div>
            </div>
          ))}
        </main>

        <footer className="mt-8 text-center text-sm text-gray-400">
          End of day's schedule. Data provided by App Scheduling Service.
        </footer>
      </div>
    </div>
  );
}
