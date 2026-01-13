import React from "react";
import AppointmentCard from "./appointment-card";

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
          {mockAppointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </main>

        <footer className="mt-8 text-center text-sm text-gray-400">
          End of day's schedule. Data provided by App Scheduling Service.
        </footer>
      </div>
    </div>
  );
}
