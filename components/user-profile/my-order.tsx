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
import { useGetMyOrderQuery } from "@/redux/features/service/staffApis";
import {
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  MapPin,
  MoreVertical,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export function MyOrdersPage() {
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "pending" | "confirmed" | "requested"
  >("all");

  const { data: orders, isLoading, isError } = useGetMyOrderQuery(undefined);

  const filteredOrders = (orders?.data || []).filter((order: any) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "pending")
      return ["pending", "scheduled", "submitted"].includes(order.status);
    return order.status === selectedFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            scheduled
          </Badge>
        );
      case "scheduled":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            scheduled
          </Badge>
        );
      case "confirmed":
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
      <div className="w-full md:w-[75%] lg:w-[55%] xl:w-[42%] flex gap-2 items-center flex-wrap bg-gray-200 rounded-md md:rounded-full p-1">
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
          onClick={() => setSelectedFilter("requested")}
          className={`px-6 rounded-full ${
            selectedFilter === "requested" ? "bg-white" : "bg-transparent"
          }`}
        >
          requested
        </Button>

        <Button
          variant="outline"
          onClick={() => setSelectedFilter("confirmed")}
          className={`px-6 rounded-full ${
            selectedFilter === "confirmed" ? "bg-white" : "bg-transparent"
          }`}
        >
          Completed
        </Button>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order: any) => (
          <Card
            key={order._id}
            className="gap-2 p-6 hover:shadow-md transition-shadow"
          >
            {/* Header Row */}
            <div className="flex items-start justify-between mb-4 gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {order?.service?.name ||
                      order?.serviceType?.name ||
                      "Service"}
                    {/* {order?. || "Service"}
                     */}
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(order.status || "pending")}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="hover:bg-primary">
                      <Link href={`/user-profile/review/${order?._id}`}>
                        Review
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-primary">
                      <Link href={`/user-profile/report/${order?._id}`}>
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
                <div className="flex items-start gap-3 text-sm">
                  <User
                    size={16}
                    className="text-muted-foreground shrink-0 mt-0.5"
                  />
                  <span className="text-foreground">
                    {order.service?.name || "Provider"}
                  </span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <MapPin
                    size={16}
                    className="text-muted-foreground shrink-0 mt-0.5"
                  />
                  <span>
                    {order?.user?.address?.city +
                      " " +
                      order?.user?.address?.permanentAddress}
                  </span>
                  <span className="text-foreground">
                    {/* {typeof order.address === 'string' 
                        ? order.address 
                        : `${order.address?.address || ''}, ${order.address?.city || ''}, ${order.address?.state || ''} ${order.address?.zipCode || ''}`} */}
                  </span>
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
                    {order.date
                      ? new Date(order.date).toLocaleDateString()
                      : "N/A"}{" "}
                    at {order.startTime || "N/A"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-foreground font-semibold">
                    $ {order.bookingFee || 0}
                  </span>
                </div>
              </div>
            </div>
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
