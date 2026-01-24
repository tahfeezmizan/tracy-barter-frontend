import {
  CirclePlay,
  CircleUserRound,
  Clock9,
  Eye,
  MapPin,
  Phone,
} from "lucide-react";
import React from "react";

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

const AppointmentCard: React.FC<{ appointment: Appointment }> = ({
  appointment,
}) => {
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

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 w-full mb-4">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start flex-grow min-w-0">
          <AvatarBlock
            initials={appointment.initials}
            colorClass={appointment.avatarColor}
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {appointment.service}
            </h3>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
              <CircleUserRound size={16} />
              <span className="truncate">{appointment.customerName}</span>
            </p>
          </div>
        </div>

        <div className="ml-4 shrink-0">
          {getStatusBadge(appointment.status)}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-3 sm:gap-x-4 text-sm text-gray-700 mt-2">
        <div className="flex items-center gap-1">
          <Clock9 size={16} />
          <span className="truncate">{appointment.time}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin size={16} />
          <span className="truncate">{appointment.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Phone size={16} />
          <span className="truncate">{appointment.phone}</span>
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
  );
};

export default AppointmentCard;
