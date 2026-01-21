"use client";

import { memo, useCallback, useMemo, useState } from "react";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import Link from "next/link";
import type { Order, OrderStatus, OrderFilter } from "./orders.types";

/** Sample order data */
const SAMPLE_ORDERS: Order[] = [
  {
    id: 1,
    service: "Deep Cleaning Service",
    status: "Pending",
    customer: "Sarah Johnson",
    date: "2024-12-10 at 10:00 AM",
    address: "123 Main St, New York, NY",
    price: "$150",
    progress: 25,
    statusIcon: Clock,
    statusColor: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    id: 2,
    service: "Electrical Work",
    status: "Completed",
    customer: "Emily Rodriguez",
    date: "2024-12-07 at 11:30 AM",
    address: "789 Pine Rd, New York, NY",
    price: "$180",
    progress: 100,
    statusIcon: CheckCircle,
    statusColor: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    id: 3,
    service: "Window Cleaning",
    status: "Cancelled",
    customer: "Lisa Anderson",
    date: "2024-12-04 at 3:00 PM",
    address: "654 Maple Dr, New York, NY",
    price: "$100",
    progress: 0,
    statusIcon: XCircle,
    statusColor: "text-red-500",
    bgColor: "bg-red-50",
  },
];

/**
 * OrderCard Component
 * Displays individual order information with action buttons
 *
 * @component
 */
const OrderCard = memo(({ order }: { order: Order }) => {
  const StatusIcon = order.statusIcon;

  return (
    <div className="bg-white rounded-xl border p-5">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-gray-800 text-lg mb-1">
            {order.service}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <div className={`px-3 py-1 rounded-full ${order.bgColor} flex items-center gap-1.5`}>
              <StatusIcon className={`w-4 h-4 ${order.statusColor}`} aria-hidden="true" />
              <span className={`font-medium ${order.statusColor}`}>
                {order.status}
              </span>
              {order.status === "Pending" && (
                <span className="text-gray-600 ml-1" aria-hidden="true">:</span>
              )}
            </div>
            <span className="text-gray-700 font-medium">
              {order.customer}
            </span>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-2xl font-bold text-gray-800">
            {order.price}
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-1">
          <div className="text-sm text-gray-500">Date & Time</div>
          <div className="font-medium text-gray-700">{order.date}</div>
        </div>
        <div className="space-y-1">
          <div className="text-sm text-gray-500">Address</div>
          <div className="font-medium text-gray-700">{order.address}</div>
        </div>
      </div>

      {/* Progress Bar */}
      {(order.status === "Pending" || order.status === "Completed") && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-bold text-gray-800">{order.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full transition-all duration-300 ${order.status === "Pending" ? "bg-[#F4C542]" : "bg-green-600"}`}
              style={{ width: `${order.progress}%` }}
              role="progressbar"
              aria-valuenow={order.progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Order progress: ${order.progress}%`}
            ></div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {(order.status === "Completed" || order.status === "Cancelled") && (
        <div className="flex gap-3 pt-4 border-t">
          <Link href={`/user-profile/review/${order.id}`}>
            <button 
              className="px-4 py-2 bg-[#F4C542] text-white rounded-lg font-medium hover:bg-[#F4C542]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-label={`Review order ${order.id}`}
            >
              Review
            </button>
          </Link>
          <button 
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            aria-label={`Report order ${order.id}`}
          >
            Report
          </button>
        </div>
      )}
    </div>
  );
});

OrderCard.displayName = "OrderCard";

/**
 * MyOrder Component
 * Displays list of user orders with filtering capabilities
 *
 * @component
 */
function MyOrder() {
  const [activeFilter, setActiveFilter] = useState<OrderFilter>("all");

  const filteredOrders = useMemo(() => {
    switch (activeFilter) {
      case "pending":
        return SAMPLE_ORDERS.filter(order => order.status === "Pending");
      case "completed":
        return SAMPLE_ORDERS.filter(order => order.status === "Completed");
      case "all":
      default:
        return SAMPLE_ORDERS;
    }
  }, [activeFilter]);

  const handleFilterChange = useCallback((filter: OrderFilter) => {
    setActiveFilter(filter);
  }, []);

  return (
    <section className="mx-auto p-6 w-full">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">All Orders</h1>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => handleFilterChange("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeFilter === "all"
                ? "bg-[#F4C542] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            aria-pressed={activeFilter === "all"}
            aria-label="Show all orders"
          >
            All Orders
          </button>
          <button 
            onClick={() => handleFilterChange("pending")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeFilter === "pending"
                ? "bg-[#F4C542] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            aria-pressed={activeFilter === "pending"}
            aria-label="Show pending orders"
          >
            Pending
          </button>
          <button 
            onClick={() => handleFilterChange("completed")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeFilter === "completed"
                ? "bg-[#F4C542] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            aria-pressed={activeFilter === "completed"}
            aria-label="Show completed orders"
          >
            Completed
          </button>
        </div>
      </header>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">No orders found</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default memo(MyOrder);