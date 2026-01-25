"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  MapPin,
  MoreVertical,
  User,
  X
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";


interface Order {
  id: string;
  service: string;
  customer: string;
  address: string;
  date: string;
  time: string;
  amount: number;
  progress: number;
  status: "pending" | "completed" | "cancelled";
  icon: React.ReactNode;
}

const ORDERS: Order[] = [
  {
    id: "1",
    service: "Deep Cleaning Service",
    customer: "Sarah Johnson",
    address: "123 Main St, New York, NY",
    date: "2024-12-10",
    time: "10:00 AM",
    amount: 150,
    progress: 25,
    status: "pending",
    icon: <Clock size={24} className="text-orange-500" />,
  },
  {
    id: "2",
    service: "Electrical Work",
    customer: "Emily Rodriguez",
    address: "789 Pine Rd, New York, NY",
    date: "2024-12-07",
    time: "11:30 AM",
    amount: 180,
    progress: 100,
    status: "completed",
    icon: <CheckCircle2 size={24} className="text-green-500" />,
  },
  {
    id: "3",
    service: "Window Cleaning",
    customer: "Lisa Anderson",
    address: "654 Maple Dr, New York, NY",
    date: "2024-12-04",
    time: "3:00 PM",
    amount: 100,
    progress: 0,
    status: "cancelled",
    icon: <X size={24} className="text-red-500" />,
  },
  {
    id: "4",
    service: "HVAC Maintenance",
    customer: "John Smith",
    address: "456 Oak Ave, New York, NY",
    date: "2024-12-15",
    time: "9:00 AM",
    amount: 200,
    progress: 60,
    status: "pending",
    icon: <Clock size={24} className="text-orange-500" />,
  },
  {
    id: "5",
    service: "Plumbing Repair",
    customer: "Rachel Chen",
    address: "321 Elm St, New York, NY",
    date: "2024-12-08",
    time: "2:00 PM",
    amount: 120,
    progress: 100,
    status: "completed",
    icon: <CheckCircle2 size={24} className="text-green-500" />,
  },
];

export function MyOrdersPage() {
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "pending" | "completed"
  >("all");

  // const { data: orders, isLoading, isError } = useGetMyOrdersQuery(undefined);


// console.log("getMyOrder",orders)


  const filteredOrders = ORDERS.filter((order) => {
    if (selectedFilter === "all") return true;
    return order.status === selectedFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pending
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Completed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Cancelled
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 w-full p-6 bg-white rounded-2xl border">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">My Orders</h1>
        <p className="text-muted-foreground">
          Track and manage your service orders
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 items-center flex-wrap w-96 bg-gray-200 rounded-full p-1">
        <Button
          variant="outline"
          onClick={() => setSelectedFilter("all")}
          className={`px-6 rounded-full ${
            selectedFilter === "all" ? "bg-white" : "bg-transparent"
          }`}
        >
          All Orders
        </Button>

        <Button
          variant="outline"
          onClick={() => setSelectedFilter("pending")}
          className={`px-6 rounded-full ${
            selectedFilter === "pending" ? "bg-white" : "bg-transparent"
          }`}
        >
          Pending
        </Button>

        <Button
          variant="outline"
          onClick={() => setSelectedFilter("completed")}
          className={`px-6 rounded-full ${
            selectedFilter === "completed" ? "bg-white" : "bg-transparent"
          }`}
        >
          Completed
        </Button>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card
            key={order.id}
            className="gap-2 p-6 hover:shadow-md transition-shadow"
          >
            {/* Header Row */}
            <div className="flex items-start justify-between mb-4 gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="shrink-0">{order.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {order.service}
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(order.status)}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="hover:bg-primary">
                      <Link href={`/user-profile/review/${order?.id}`}>
                        Review
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-primary">
                      <Link href={`/user-profile/report/${order?.id}`}>
                        Report
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              {/* Left Column */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <User size={16} className="text-muted-foreground shrink-0" />
                  <span className="text-foreground">{order.customer}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin
                    size={16}
                    className="text-muted-foreground shrink-0"
                  />
                  <span className="text-foreground">{order.address}</span>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar
                    size={16}
                    className="text-muted-foreground shrink-0"
                  />
                  <span className="text-foreground">
                    {order.date} at {order.time}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <DollarSign
                    size={16}
                    className="text-muted-foreground shrink-0"
                  />
                  <span className="text-foreground font-semibold">
                    ${order.amount}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            {/* {order.status !== "cancelled" && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground">
                    Progress
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {order.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-black rounded-full h-2 transition-all duration-300"
                    style={{ width: `${order.progress}%` }}
                  />
                </div>
              </div>
            )} */}
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">
            No {selectedFilter !== "all" ? selectedFilter : ""} orders found
          </p>
        </Card>
      )}
    </div>
  );
}
