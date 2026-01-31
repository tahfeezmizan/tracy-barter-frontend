"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Pencil, Eye, Trash2, Search } from "lucide-react";
import { BookingDetailsModal } from "./booking-details-modal";
import { useState } from "react";

const bookings = [
  {
    id: 1,
    userName: "Michael Chen",
    userEmail: "michael@example.com",
    service: "Laundry & Ironing",
    staffName: "Michael Chen",
    staffEmail: "michael@example.com",
    date: "2025-02-16",
    time: "14:00 - 16:00",
    location: "San Francisco, CA",
    status: "active",
    price: 120,
  },
  {
    id: 2,
    userName: "Michael Chen",
    userEmail: "michael@example.com",
    service: "Garden Maintenance",
    staffName: "Michael Chen",
    staffEmail: "michael@example.com",
    date: "2025-02-16",
    time: "14:00 - 16:00",
    location: "San Francisco, CA",
    status: "active",
    price: 120,
  },
  {
    id: 3,
    userName: "Michael Chen",
    userEmail: "michael@example.com",
    service: "Deep Cleaning",
    staffName: "Michael Chen",
    staffEmail: "michael@example.com",
    date: "2025-02-16",
    time: "14:00 - 16:00",
    location: "San Francisco, CA",
    status: "active",
    price: 120,
  },
  {
    id: 4,
    userName: "Michael Chen",
    userEmail: "michael@example.com",
    service: "Deep Cleaning",
    staffName: "Michael Chen",
    staffEmail: "michael@example.com",
    date: "2025-02-16",
    time: "14:00 - 16:00",
    location: "San Francisco, CA",
    status: "scheduled",
    price: 120,
  },
  {
    id: 5,
    userName: "Michael Chen",
    userEmail: "michael@example.com",
    service: "Deep Cleaning",
    staffName: "Michael Chen",
    staffEmail: "michael@example.com",
    date: "2025-02-16",
    time: "14:00 - 16:00",
    location: "San Francisco, CA",
    status: "requested",
    price: 120,
  },
];

export default function AllBookingTable() {
  const [open, setOpen] = useState(false);
const [selectedBooking, setSelectedBooking] = useState<any>(null);

  return (
    <Card className="w-full bg-white text-black">
      <CardHeader className="space-y-2">
        <CardTitle className="text-xl leading-1">
          All Booking
        </CardTitle>
        <CardDescription>
          View and manage your booking
        </CardDescription>

        {/* Search Bar */}
        <div className="relative mt-2 w-full max-w-sm">
          <Input placeholder="Search bookings..." className="pl-10" />
          <Search className="size-5 absolute left-3 top-2 text-gray-400" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4">User Name</th>
                <th className="p-4">Service</th>
                <th className="p-4">Staff</th>
                <th className="p-4">Date</th>
                <th className="p-4">Time</th>
                <th className="p-4">Location</th>
                <th className="p-4">Status</th>
                <th className="p-4">Price</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-t">
                  <td className="p-4">
                    <p className="font-medium">{booking.userName}</p>
                    <p className="text-xs text-gray-500">
                      {booking.userEmail}
                    </p>
                  </td>

                  <td className="p-4">
                    {booking.service}
                  </td>

                  <td className="p-4">
                    <p className="font-medium">{booking.staffName}</p>
                    <p className="text-xs text-gray-500">
                      {booking.staffEmail}
                    </p>
                  </td>

                  <td className="p-4">
                    {booking.date}
                  </td>

                  <td className="p-4">
                    {booking.time}
                  </td>

                  <td className="p-4">
                    {booking.location}
                  </td>

                  <td className="p-4">
                    <Badge
                      className={`px-3 py-1 rounded-full ${
                        booking.status === "active"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "scheduled"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {booking.status === "active"
                        ? "Active"
                        : booking.status === "scheduled"
                        ? "Scheduled"
                        : "Requested"}
                    </Badge>
                  </td>

                  <td className="p-4">
                    <Badge className="bg-blue-500 text-white">
                      ${booking.price}
                    </Badge>
                  </td>

                  <td className="p-4 text-center flex items-center justify-center gap-3">
                    <button
  onClick={() => {
    setSelectedBooking(booking);
    setOpen(true);
  }}
>
  <Eye className="h-5 w-5 text-gray-600 hover:text-black" />
</button>


                    <button>
                      <Trash2 className="h-5 w-5 text-red-500 hover:text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <BookingDetailsModal
  open={open}
  onClose={() => setOpen(false)}
  booking={selectedBooking}
/>

      </CardContent>
    </Card>
  );
}
