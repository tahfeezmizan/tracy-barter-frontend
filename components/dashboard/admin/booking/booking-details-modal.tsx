"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone } from "lucide-react";
import Link from "next/link";

type Booking = {
  service?: string;
  location?: string;
  price: number;
  address?: {
    address: string;
    city: string;
    zipCode: string;
  };
  googleMapsUrl?: string;
  userPhoneUrl?: string;
};

interface Props {
  open: boolean;
  onClose: () => void;
  booking: Booking | null;
}

export function BookingDetailsModal({ open, onClose, booking }: Props) {
  if (!booking) return null;

  console.log("booking",booking);
  

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="p-6 space-y-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Booking Details
            </DialogTitle>            
          </DialogHeader>

          {/* Location */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-medium">
              <MapPin className="h-4 w-4" />
              Location
            </div>
            <p className="text-sm text-gray-700 capitalize">
              {booking?.address?.address} <br />
              {booking?.address?.city}, {booking?.address?.zipCode}
            </p>

            <div className="flex gap-2 pt-2">
              <Link href={booking?.googleMapsUrl || "#"} target="_blank">
              <Button variant="outline" size="sm" className="rounded-full">
                Open in Maps
              </Button>
              </Link>
              
              <Link href={booking.userPhoneUrl || "#"}>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full flex items-center gap-1"
              >
                <Phone className="h-4 w-4" />
                Call User
              </Button>
              </Link>
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-3">
            <h4 className="font-semibold">Pricing & Payment</h4>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Service Price</span>
              <span>${booking.price}</span>
            </div>

            <div className="flex justify-between text-sm items-center">
              <span className="text-gray-600">Booking Fee</span>
              <span className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-700">
                  completed
                </Badge>
                $12
              </span>
            </div>

            <div className="flex justify-between text-sm items-center">
              <span className="text-gray-600">Service Charge</span>
              <span className="flex items-center gap-2">
                <Badge className="bg-yellow-100 text-yellow-700">
                  pending
                </Badge>
                $0
              </span>
            </div>

            <div className="border-t pt-3 flex justify-between font-semibold">
              <span>Total</span>
              <span className="text-purple-600 text-lg">
                ${booking.price + 12}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            {/* <Button className="flex-1 bg-slate-900 text-white">
              Edit
            </Button> */}
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
