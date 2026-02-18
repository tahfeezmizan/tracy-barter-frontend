"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppointmentsBooking } from "@/lib/types/schedule.types";
import { formatDateOnly } from "@/lib/utils";
import {
  useGetMyServicesStaffQuery,
  useUpdateBookingStatusMutation,
} from "@/redux/features/staffdashboard/staffStatsApis";
import { CheckCircle, Clock9, Eye, MapPin, Play } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { AvatarBlock } from "../schedule/appointment-list";
import { AppointmentDetailsModal } from "@/lib/modal/appointment-details-modal";

const STATUS_COLOR = {
  confirmed: "bg-purple-100 text-purple-700 border-purple-200",
  scheduled: "bg-yellow-100 text-yellow-700 border-yellow-200",
  inProgress: "bg-blue-100 text-blue-700 border-blue-200",
  completed: "bg-green-100 text-green-700 border-green-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
  requested: "bg-gray-100 text-gray-700 border-gray-300",
};

type FilterStatus =
  | "All"
  | "Confirmed"
  | "Scheduled"
  | "In Progress"
  | "Completed"
  | "Cancelled";

export default function ServiceList() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterStatus>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);

  // Map filter to API status
  const getApiStatusFromFilter = (
    filterStatus: FilterStatus
  ): string | undefined => {
    const map: Record<FilterStatus, string | undefined> = {
      All: undefined,
      Confirmed: "confirmed",
      Scheduled: "scheduled",
      "In Progress": "inProgress",
      Completed: "completed",
      Cancelled: "cancelled",
    };
    return map[filterStatus];
  };

  // Fetch data with pagination parameters
  const { data } = useGetMyServicesStaffQuery({
    page: currentPage,
    limit: pageSize,
    search: searchTerm || undefined,
    status: getApiStatusFromFilter(filter),
  });

  const [updateBookingStatus, { isLoading }] = useUpdateBookingStatusMutation();

  // Filter data client-side for immediate feedback while search is debounced
  const filteredServices = useMemo(() => {
    if (!data?.data) return [];

    return data.data.filter((service: AppointmentsBooking) => {
      // Apply tab filter
      let statusMatch = true;
      if (filter !== "All") {
        if (filter === "In Progress") {
          statusMatch = service.status === "inProgress";
        } else {
          statusMatch = service.status.toLowerCase() === filter.toLowerCase();
        }
      }

      // Apply search filter
      const searchMatch =
        !searchTerm ||
        service?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service?.serviceType?.title
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        service?.address?.address
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());

      return statusMatch && searchMatch;
    });
  }, [data?.data, filter, searchTerm]);

  // Reset to page 1 when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchTerm]);

  // Calculate total pages
  const totalPages = data?.meta?.totalPages || 1;
  const totalItems = data?.meta?.total || 0;

  // services status update
  const handleUpdateStatus = async (
    bookingId: string,
    currentStatus: string
  ) => {
    let nextStatus = "";

    if (currentStatus === "scheduled") nextStatus = "inProgress";
    else if (currentStatus === "inProgress") nextStatus = "completed";
    else return;

    try {
      await updateBookingStatus({
        bookingId,
        status: nextStatus,
      }).unwrap();

      toast.success(
        nextStatus === "inProgress"
          ? "Service started successfully"
          : "Service completed successfully"
      );
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update booking status");
    }
  };

  // Handle search with debounce (optional - implement if needed)
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
              className={`cursor-pointer ${
                currentPage === i
                  ? "bg-primary text-white hover:bg-primary hover:text-white"
                  : "hover:bg-transparent"
              }`}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Show limited pages with ellipsis
      if (currentPage <= 3) {
        // Show first 4 pages and last page
        for (let i = 1; i <= 4; i++) {
          items.push(
            <PaginationItem key={i}>
              <PaginationLink
                onClick={() => handlePageChange(i)}
                isActive={currentPage === i}
                className={`cursor-pointer ${
                  currentPage === i
                    ? "bg-primary text-white hover:bg-primary hover:text-white"
                    : "hover:bg-transparent"
                }`}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }
        items.push(
          <PaginationItem key="ellipsis">
            <span className="px-2">...</span>
          </PaginationItem>
        );
        items.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              onClick={() => handlePageChange(totalPages)}
              isActive={currentPage === totalPages}
              className={`cursor-pointer ${
                currentPage === totalPages
                  ? "bg-primary text-white hover:bg-primary hover:text-white"
                  : "hover:bg-transparent"
              }`}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (currentPage >= totalPages - 2) {
        // Show first page and last 4 pages
        items.push(
          <PaginationItem key={1}>
            <PaginationLink
              onClick={() => handlePageChange(1)}
              isActive={currentPage === 1}
              className={`cursor-pointer ${
                currentPage === 1
                  ? "bg-primary text-white hover:bg-primary hover:text-white"
                  : "hover:bg-transparent"
              }`}
            >
              1
            </PaginationLink>
          </PaginationItem>
        );
        items.push(
          <PaginationItem key="ellipsis">
            <span className="px-2">...</span>
          </PaginationItem>
        );
        for (let i = totalPages - 3; i <= totalPages; i++) {
          items.push(
            <PaginationItem key={i}>
              <PaginationLink
                onClick={() => handlePageChange(i)}
                isActive={currentPage === i}
                className={`cursor-pointer ${
                  currentPage === i
                    ? "bg-primary text-white hover:bg-primary hover:text-white"
                    : "hover:bg-transparent"
                }`}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }
      } else {
        // Show first, current-1, current, current+1, and last
        items.push(
          <PaginationItem key={1}>
            <PaginationLink
              onClick={() => handlePageChange(1)}
              isActive={currentPage === 1}
              className={`cursor-pointer ${
                currentPage === 1
                  ? "bg-primary text-white hover:bg-primary hover:text-white"
                  : "hover:bg-transparent"
              }`}
            >
              1
            </PaginationLink>
          </PaginationItem>
        );
        items.push(
          <PaginationItem key="ellipsis1">
            <span className="px-2">...</span>
          </PaginationItem>
        );
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          items.push(
            <PaginationItem key={i}>
              <PaginationLink
                onClick={() => handlePageChange(i)}
                isActive={currentPage === i}
                className={`cursor-pointer ${
                  currentPage === i
                    ? "bg-primary text-white hover:bg-primary hover:text-white"
                    : "hover:bg-transparent"
                }`}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }
        items.push(
          <PaginationItem key="ellipsis2">
            <span className="px-2">...</span>
          </PaginationItem>
        );
        items.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              onClick={() => handlePageChange(totalPages)}
              isActive={currentPage === totalPages}
              className={`cursor-pointer ${
                currentPage === totalPages
                  ? "bg-primary text-white hover:bg-primary hover:text-white"
                  : "hover:bg-transparent"
              }`}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return items;
  };

  return (
    <div className="w-full rounded-xl">
      {/* Search + Status Filter Row */}
      <div className="">
        <Input
          placeholder="Search by client or service?._.."
          className="bg-white text-black py-5 text-xl!"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Tabs Filter */}
      <Tabs defaultValue="all" className="mt-6">
        <TabsList className="bg-white text-black px-2 py-1.5 rounded-md flex flex-wrap gap-1">
          <TabsTrigger
            className="text-lg"
            value="all"
            onClick={() => setFilter("All")}
          >
            All
          </TabsTrigger>
          <TabsTrigger
            className="text-lg"
            value="confirmed"
            onClick={() => setFilter("Confirmed")}
          >
            Confirmed
          </TabsTrigger>
          <TabsTrigger
            className="text-lg"
            value="scheduled"
            onClick={() => setFilter("Scheduled")}
          >
            Scheduled
          </TabsTrigger>
          <TabsTrigger
            className="text-lg"
            value="inProgress"
            onClick={() => setFilter("In Progress")}
          >
            In Progress
          </TabsTrigger>
          <TabsTrigger
            className="text-lg"
            value="completed"
            onClick={() => setFilter("Completed")}
          >
            Completed
          </TabsTrigger>
          <TabsTrigger
            className="text-lg"
            value="cancelled"
            onClick={() => setFilter("Cancelled")}
          >
            Cancelled
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Grid of Cards */}
      <div className="grid gap-4 mt-6 grid-cols-1 md:grid-cols-2">
        {filteredServices.length > 0 ? (
          filteredServices.map((service: AppointmentsBooking) => (
            <Card
              key={service?._id}
              className="p-5 bg-white text-black rounded-xl overflow-hidden gap-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AvatarBlock name={service?.user?.name} />
                  <div>
                    <h3 className="font-semibold text-lg text-black">
                      {service?.serviceType?.title}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {service?.user?.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full border capitalize ${
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
                <span className="truncate">
                  {formatDateOnly(service?.date)}
                </span>
              </p>
              <p className="text-sm flex items-center gap-2">
                <MapPin size={16} />
                <span className="truncate">{service?.address?.address}</span>
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  className="flex-1 inline-flex items-center justify-center gap-1 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-gray-50 text-gray-700 hover:bg-gray-100 h-10 px-4 py-2 border border-gray-200"
                  onClick={() => {
                    setOpenId(service._id);
                    // console.log("Clicked appointment ID:", service._id);
                  }}
                >
                  <Eye size={16} />
                  View Details
                </button>

                {(service?.status === "scheduled" ||
                  service?.status === "inProgress") && (
                  <Button
                    disabled={isLoading}
                    onClick={() =>
                      handleUpdateStatus(service?._id, service?.status)
                    }
                    className="w-full flex-1 flex items-center gap-1 px-4 py-2 rounded-lg text-sm text-white bg-secondary hover:bg-primary"
                  >
                    {service?.status === "scheduled" ? (
                      <Play size={16} />
                    ) : (
                      <CheckCircle size={16} />
                    )}

                    {service?.status === "scheduled"
                      ? "Start Service"
                      : "Complete Service"}
                  </Button>
                )}
              </div>

            </Card>
          ))
        ) : (
          <div className="col-span-2 text-center py-8 text-gray-500">
            No services found for the selected filter.
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalItems > pageSize && (
        <div className="mt-8 ">
          <Pagination>
            <PaginationContent>
              <PaginationItem className="rounded hover:text-white! hover:bg-primary">
                <PaginationPrevious
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50 "
                      : "cursor-pointer hover:bg-primary hover:text-white"
                  }
                />
              </PaginationItem>

              {renderPaginationItems()}

              <PaginationItem className="">
                <PaginationNext
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPage + 1))
                  }
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer hover:bg-primary hover:text-white"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

          {/* Page info */}
          {/* <div className="text-center text-sm text-gray-500 mt-2">
            Showing {(currentPage - 1) * pageSize + 1} -{" "}
            {Math.min(currentPage * pageSize, totalItems)} of {totalItems}{" "}
            services
          </div> */}
        </div>
      )}

      {/* MODAL */}
      {openId && (
        <AppointmentDetailsModal
          open={!!openId}
          onOpenChange={(open) => {
            if (!open) setOpenId(null);
          }}
          serviceId={openId!}
        />
      )}
    </div>
  );
}
