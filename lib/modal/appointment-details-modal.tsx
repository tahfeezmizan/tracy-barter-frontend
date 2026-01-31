"use client";

import { useGetSingleSheduleQuery } from "@/redux/features/staff/staffApis";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Clock, MapPin, Phone } from "lucide-react"; // for icons like in your image
import { formatDateOnly } from "../utils";
import Link from "next/link";

interface ServiceDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceId: string;
}

const STATUS_COLOR = {
  confirmed: "bg-purple-100 text-purple-700 border-purple-200",
  scheduled: "bg-yellow-100 text-yellow-700 border-yellow-200",
  inProgress: "bg-blue-100 text-blue-700 border-blue-200",
  completed: "bg-green-100 text-green-700 border-green-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
  requested: "bg-gray-100 text-gray-700 border-gray-300",
};

export function AppointmentDetailsModal({
  open,
  onOpenChange,
  serviceId,
}: ServiceDetailsModalProps) {
  const { data } = useGetSingleSheduleQuery(serviceId, {
    skip: !open,
  });

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 data-[state=open]:animate-fadeIn" />
        <Dialog.Content className="fixed top-[10%] left-[50%] max-w-lg w-[90vw] -translate-x-1/2 rounded-md bg-gray-100 p-6 shadow-lg data-[state=open]:animate-scaleIn focus:outline-none">
          <div className="flex justify-between items-center">
            <Dialog.Title className="font-semibold text-lg">
              Service Details
            </Dialog.Title>
            <Dialog.Close className="btn-icon" aria-label="Close">
              <X size={20} />
            </Dialog.Close>
          </div>
          <Dialog.Description className="text-sm text-gray-700 mb-6">
            Complete information about this appointment
          </Dialog.Description>

          <div className="bg-gray-200 rounded-md p-4 mb-6 flex gap-4">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-slate-900 text-white font-semibold text-lg overflow-hidden">
              {data?.user?.name ? (
                data.user.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
              ) : (
                <div className="animate-pulse bg-slate-700 w-full h-full" />
              )}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">
                {data?.user?.name || "Loading..."}
              </p>
              <p className="text-sm text-gray-600">
                {data?.serviceType?.title || "..."}
              </p>
              <p className="mt-3 flex items-center gap-2 text-gray-600 text-sm">
                <Clock size={16} /> {formatDateOnly(data?.date)}
              </p>
              <p className="flex items-center gap-2 text-gray-600 text-sm">
                <MapPin size={16} /> {data?.address?.address || "..."}
              </p>
              <p className="flex items-center gap-2 text-gray-600 text-sm">
                <Phone size={16} /> {data?.user?.phone || "..."}
              </p>
            </div>
            <div className="">
              <span
                className={`text-xs px-2 py-1 rounded-full  border capitalize ${
                  data?.status &&
                  STATUS_COLOR[data?.status as keyof typeof STATUS_COLOR]
                    ? STATUS_COLOR[data?.status as keyof typeof STATUS_COLOR]
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {data?.status?.replace(/([A-Z])/g, " $1") || "Pending"}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Special Notes:
            </label>
            <div className="bg-gray-300 rounded-md p-3 text-sm text-gray-600 whitespace-pre-wrap min-h-[60px]">
              {data?.notes || "No special notes."}
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              href={data?.googleMapsUrl || "#"}
              target={data?.googleMapsUrl ? "_blank" : undefined}
              className={`flex-1 inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 h-10 px-4 ${
                !data?.googleMapsUrl ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <MapPin size={16} />
              Directions
            </Link>

            <Link
              href={data?.userPhoneUrl || "#"}
              className={`flex-1 inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 h-10 px-4 ${
                !data?.userPhoneUrl ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <Phone size={16} />
              Call Client
            </Link>
          </div>

          {/* <Dialog.Close asChild>
            <button
              className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-md bg-slate-900 text-white text-sm font-medium h-10 px-4 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label="Start Service Now"
            >
              ▶️ Start Service Now
            </button>
          </Dialog.Close> */}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
