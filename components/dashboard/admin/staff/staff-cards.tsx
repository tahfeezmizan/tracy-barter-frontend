/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetStaffQuery } from "@/redux/features/service/clientApis";
import { CircleUser, Mail, Phone } from "lucide-react";
// import { Staff } from "@/config/Types/types";
import Image from "next/image";



export default function StaffCards() {
  const { data, isLoading } = useGetStaffQuery();
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
              <Button className="w-full mt-2 bg-gray-100 text-gray-800 hover:bg-gray-200">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
