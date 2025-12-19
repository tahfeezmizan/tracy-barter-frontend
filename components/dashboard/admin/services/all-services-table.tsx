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
import { useGetServiceQuery } from "@/redux/features/service/serviceApis";

export default function AllServicesTable() {
  const { data, isLoading } = useGetServiceQuery(undefined);

  return (
    <Card className="bg-white shadow-sm rounded-xl p-6 w-full text-black">
      {/* Title */}
      <div className="">
        <h2 className="text-xl font-semibold">All Services</h2>
        <p className="text-gray-500 text-sm">
          View and manage your service catalog
        </p>
      </div>

      <CardContent className="p-0 border rounded-md">
        <Table>
          <TableHeader className="bg-gray-100 ">
            <TableRow>
              <TableHead className="text-gray-700 font-semibold">
                Service Name
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">
                Description
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">
                Price
              </TableHead>
              {/* <TableHead className="text-gray-700 font-semibold">
                Duration
              </TableHead> */}
              <TableHead className="text-gray-700 font-semibold">
                Bookings
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">
                Status
              </TableHead>
              <TableHead className="text-gray-700 font-semibold text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.data?.map((service, i) => (
              <TableRow key={i} className="hover:bg-gray-50">
                <TableCell className="font-medium">{service.name}</TableCell>

                <TableCell>{service.description}</TableCell>
                <TableCell>{service.price || "0"}</TableCell>
                {/* <TableCell>{service.duration}</TableCell> */}
                <TableCell>{service.bookings || "0"}</TableCell>

                <TableCell>
                  {service.status === "active" ? (
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
