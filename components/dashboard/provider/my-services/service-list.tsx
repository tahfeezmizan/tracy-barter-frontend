"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDateOnly } from "@/lib/utils";
import { useGetMyServicesStaffQuery } from "@/redux/features/staffdashboard/staffStatsApis";
import { CircleCheckBig, CircleX, Clock, Clock9, MapPin } from "lucide-react";
import { useState } from "react";

type ServiceItem = {
  id: number;
  initials: string;
  title: string;
  client: string;
  date: string;
  time: string;
  address: string;
  rating?: number;
  status: "Scheduled" | "Completed" | "Cancelled";
};

const serviceData: ServiceItem[] = [
  {
    id: 1,
    initials: "SJ",
    title: "Home Cleaning",
    client: "Sarah Johnson",
    date: "Sat, Oct 25",
    time: "9:00 AM - 11:00 AM",
    address: "123 Oak Street, Springfield",
    status: "Scheduled",
  },
  {
    id: 2,
    initials: "MD",
    title: "Grocery Shopping",
    client: "Mike Davis",
    date: "Sat, Oct 25",
    time: "2:00 PM - 3:00 PM",
    address: "456 Maple Avenue, Springfield",
    status: "Scheduled",
  },
];

const getStatusIcon = (status: ServiceItem["status"]) => {
  switch (status) {
    case "Scheduled":
      return <Clock className="size-5 text-blue-500" />;
    case "Completed":
      return <CircleCheckBig className="size-5 text-green-500/80" />;
    case "Cancelled":
      return <CircleX className="size-5 text-red-500/80" />;
  }
};

const STATUS_COLOR = {
  confirmed: "bg-purple-100 text-purple-700 border-purple-200",
  scheduled: "bg-yellow-100 text-yellow-700 border-yellow-200",
  inProgress: "bg-blue-100 text-blue-700 border-blue-200",
  completed: "bg-green-100 text-green-700 border-green-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
  requested: "bg-gray-100 text-gray-700 border-gray-300",
};

export default function ServiceList() {
  const [filter, setFilter] = useState<
    "All" | "Scheduled" | "Completed" | "Cancelled"
  >("All");

  const filteredList =
    filter === "All"
      ? serviceData
      : serviceData.filter((item) => item.status === filter);

  const statusColor = {
    Scheduled: "bg-yellow-200 text-yellow-700",
    Completed: "bg-green-200 text-green-700",
    Cancelled: "bg-red-200 text-red-700",
  };

  const { data } = useGetMyServicesStaffQuery(undefined);
  console.log(data?.data);

  return (
    <div className="w-full  rounded-xl">
      {/* Search + Status Filter Row */}
      <div className="flex flex-col md:flex-row justify-between gap-3">
        <Input
          placeholder="Search by client or service?._.."
          className="bg-white text-black"
        />

        <select className="border rounded-md px-3 py-2 bg-white text-black  text-sm">
          <option>All Status</option>
          <option>Scheduled</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
      </div>

      {/* Tabs Filter */}
      <Tabs defaultValue="all" className="mt-6">
        <TabsList className="bg-white text-black px-2 py-1 rounded-md">
          <TabsTrigger value="all" onClick={() => setFilter("All")}>
            All ({serviceData.length})
          </TabsTrigger>
          <TabsTrigger value="scheduled" onClick={() => setFilter("Scheduled")}>
            Scheduled (2)
          </TabsTrigger>
          <TabsTrigger value="completed" onClick={() => setFilter("Completed")}>
            Completed (3)
          </TabsTrigger>
          <TabsTrigger value="cancelled" onClick={() => setFilter("Cancelled")}>
            Cancelled (1)
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Grid of Cards */}
      <div className="grid gap-4 mt-6 grid-cols-1 md:grid-cols-2">
        {data?.data?.slice(0, 6).map((service) => (
          <Card
            key={service?._id}
            className="p-5 bg-white text-black rounded-xl overflow-hidden gap-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#0B1F3A] text-white flex items-center justify-center font-semibold">
                  {service?.initials}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-black">
                    {service?.serviceType?.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{service?.user?.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full  border capitalize ${
                    STATUS_COLOR[
                      service?.status as keyof typeof STATUS_COLOR
                    ] ?? "bg-gray-100 text-gray-600"
                  }`}
                >
                  {service?.status?.replace(/([A-Z])/g, " $1")}
                </span>
              </div>
            </div>

            <p className="mt-3 text-sm flex items-center gap-2">
              <Clock9 size={16} />
              <span className="truncate">{formatDateOnly(service?.date)}</span>
            </p>
            <p className="text-sm flex items-center gap-2">
              <MapPin size={16} />
              <span className="truncate">{service?.address?.address}</span>
            </p>

            {service?._rating && (
              <p className="mt-3 text-sm">
                Client Rating: ⭐ <strong>{service?._rating}</strong>
              </p>
            )}

            {/* Buttons */}
            <div className="flex gap-2 mt-4">
              {service?._status === "Scheduled" ? (
                <>
                  <Button className="w-1/2 bg-gray-900 text-white">
                    Complete Service
                  </Button>

                  <Button variant="outline" className="w-1/2">
                    View Details
                  </Button>
                </>
              ) : (
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
