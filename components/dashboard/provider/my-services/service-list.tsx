"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Check, CircleCheckBig, CircleX, Clock, X } from "lucide-react";

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
  {
    id: 3,
    initials: "JS",
    title: "Home Cleaning",
    client: "John Smith",
    date: "Fri, Oct 24",
    time: "10:00 AM - 12:00 PM",
    address: "321 Elm Street, Springfield",
    rating: 5.0,
    status: "Completed",
  },
  {
    id: 4,
    initials: "LB",
    title: "Grocery Shopping",
    client: "Lisa Brown",
    date: "Thu, Oct 23",
    time: "3:00 PM - 4:00 PM",
    address: "654 Birch Lane, Springfield",
    rating: 5.0,
    status: "Completed",
  },
  {
    id: 5,
    initials: "DL",
    title: "Home Maintenance",
    client: "David Lee",
    date: "Wed, Oct 22",
    time: "9:00 AM - 11:00 AM",
    address: "789 Pine Road, Springfield",
    rating: 4.0,
    status: "Completed",
  },
  {
    id: 6,
    initials: "EW",
    title: "Home Cleaning",
    client: "Emma Wilson",
    date: "Mon, Oct 20",
    time: "2:00 PM - 4:00 PM",
    address: "147 Oak Avenue, Springfield",
    status: "Cancelled",
  },
];


const statusIcon = {
  Scheduled: <Clock className="size-5 text-blue-500" />,
  Completed: <CircleCheckBig className="size-5 text-green-500/80" />,
  Cancelled: <CircleX className="size-5 text-red-500/80" />,
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

  return (
    <div className="w-full  rounded-xl">
      {/* Search + Status Filter Row */}
      <div className="flex flex-col md:flex-row justify-between gap-3">
        <Input
          placeholder="Search by client or service..."
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
        {filteredList.map((service) => (
          <Card
            key={service.id}
            className="p-5 bg-white text-black rounded-xl overflow-hidden gap-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#0B1F3A] text-white flex items-center justify-center font-semibold">
                  {service?.initials}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-black">
                    {service?.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{service?.client}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {statusIcon[service.status]}
                <Badge className={statusColor[service.status]}>
                  {service.status}
                </Badge>
              </div>
            </div>

            <p className="mt-3 text-sm flex items-center gap-2">
              📅 {service.date} • {service.time}
            </p>
            <p className="text-sm flex items-center gap-2">
              📍 {service.address}
            </p>

            {service.rating && (
              <p className="mt-3 text-sm">
                Client Rating: ⭐ <strong>{service.rating}</strong>
              </p>
            )}

            {/* Buttons */}
            <div className="flex gap-2 mt-4">
              {service.status === "Scheduled" ? (
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
