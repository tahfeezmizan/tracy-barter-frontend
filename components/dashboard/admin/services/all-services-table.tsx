"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";

const services = [
  {
    name: "Home Cleaning",
    description: "Professional home cleaning service",
    price: "$125",
    duration: "2-3 hours",
    bookings: 45,
    status: "Active",
  },
  {
    name: "Grocery Shopping",
    description: "Personal grocery shopping and delivery",
    price: "$35",
    duration: "1-2 hours",
    bookings: 67,
    status: "Active",
  },
  {
    name: "Home Maintenance",
    description: "General home repairs and maintenance",
    price: "$150",
    duration: "2-4 hours",
    bookings: 28,
    status: "Active",
  },
  {
    name: "Snow Removal",
    description: "Driveway and walkway snow clearing",
    price: "$75",
    duration: "1 hour",
    bookings: 12,
    status: "Active",
  },
  {
    name: "Lawn Care",
    description: "Lawn mowing and yard maintenance",
    price: "$85",
    duration: "1-2 hours",
    bookings: 0,
    status: "Inactive",
  },
];

export default function AllServicesTable() {
  return (
    <Card className="bg-white shadow-sm rounded-xl p-6">
      {/* Title */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">All Services</h2>
        <p className="text-gray-500 text-sm">
          View and manage your service catalog
        </p>
      </div>

      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-700">Service Name</TableHead>
              <TableHead className="text-gray-700">Description</TableHead>
              <TableHead className="text-gray-700">Price</TableHead>
              <TableHead className="text-gray-700">Duration</TableHead>
              <TableHead className="text-gray-700">Bookings</TableHead>
              <TableHead className="text-gray-700">Status</TableHead>
              <TableHead className="text-gray-700 text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {services.map((service, i) => (
              <TableRow key={i} className="hover:bg-gray-50">
                <TableCell className="font-medium">{service.name}</TableCell>

                <TableCell>{service.description}</TableCell>
                <TableCell>{service.price}</TableCell>
                <TableCell>{service.duration}</TableCell>
                <TableCell>{service.bookings}</TableCell>

                <TableCell>
                  {service.status === "Active" ? (
                    <span className="px-3 py-1 text-sm bg-green-500 text-white rounded-full">
                      Active
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-full">
                      Inactive
                    </span>
                  )}
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Pencil
                      size={18}
                      className="cursor-pointer text-gray-700 hover:text-black"
                    />
                    <Trash2
                      size={18}
                      className="cursor-pointer text-red-500 hover:text-red-600"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
