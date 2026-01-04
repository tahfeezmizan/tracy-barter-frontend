/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StaffDetailsDialog } from "@/lib/modal/staff-details-dialog";
import { useGetStaffQuery } from "@/redux/features/service/clientApis";
import { useDeleteStaffMutation } from "@/redux/features/service/staffApis";
import { CircleUser, Mail, Phone } from "lucide-react";
import Swal from "sweetalert2";
// import { Staff } from "@/config/Types/types";
import Image from "next/image";
import { useState } from "react";

export default function StaffCards() {
  const [open, setOpen] = useState(false);
  const [staffId, setStaffId] = useState<string | null>(null);

  const { data, isLoading } = useGetStaffQuery();

  const [deleteStaff] = useDeleteStaffMutation();

  const handleDelete = async (id: string) => {
    // Step 1: Ask for confirmation
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        // Step 2: Perform delete
        const res: any = await deleteStaff(id);
        console.log("deleteStaff", res);

        // Step 3: Show success message
        Swal.fire("Deleted!", "Staff has been deleted.", "success");
      } catch (error) {
        console.log(error);
        Swal.fire(
          "Error!",
          "Something went wrong while deleting staff.",
          "error"
        );
      }
    }
  };

  const openModal = (id: string) => {
    setStaffId(id);
    setOpen(true);
  };
  // console.log("useGetStaffQuery", data?.data);
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data?.map((person: any, i: number) => (
          <Card key={i} className="p-6 rounded-xl shadow-sm bg-white">
            <CardContent className="p-0 space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-7">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full border text-white flex items-center justify-center font-semibold">
                    {person?.profile ? (
                      <Image
                        src={person?.profile}
                        alt={person?.name}
                        width={200}
                        height={200}
                        className="w-full h-full rounded-full"
                      />
                    ) : (
                      <CircleUser className="text-black size-12" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-black capitalize">
                      {person?.name}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {person?.service || person?.role}
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1 text-sm bg-green-500 text-white rounded-full">
                  Active
                </span>
              </div>

              {/* Rating + Completed */}
              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-600">Rating</div>
                <div className="flex items-center gap-1 text-gray-800">
                  {person?.rating || 0} ⭐
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-600">Completed</div>
                <div className="text-gray-800">
                  {person?.services?.length || 0} services
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-gray-500" />
                  {person?.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-gray-500" />
                  {person?.phone || "XXXXXXXXXX"}
                </div>
              </div>

              {/* Button */}
              <div className="flex items-center justify-center gap-4 mt-2">
                <Button
                  onClick={() => openModal(person?._id)}
                  className="flex-1  bg-gray-100 text-gray-800 hover:bg-gray-200"
                >
                  View Details
                </Button>
                <Button
                  onClick={() => handleDelete(person?._id)}
                  className="flex-1 bg-red-400 text-white hover:bg-red-500"
                >
                  Delete Staff
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {staffId && (
        <StaffDetailsDialog
          open={open}
          onOpenChange={setOpen}
          staffId={staffId}
        />
      )}
    </div>
  );
}
