"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AssignStaffModal } from "@/lib/modal/AssignStaffModal";
import { PriceEditModal } from "@/lib/modal/PriceEditModal";
import {
  useGetBookingsQuery,
  useUpdateAssingStaffMutation,
  useUpdateBookingPriceMutation,
} from "@/redux/features/booking/bookingApi";
import { ChevronLeft, ChevronRight, Edit, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BookingDetailsModal } from "./booking-details-modal";

export default function AllBookingTable() {
  const [open, setOpen] = useState(false);
  const [priceModalOpen, setPriceModalOpen] = useState(false);
  const [assingStaffOpen, setAssingStaffOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [selectedBookingForPrice, setSelectedBookingForPrice] =
    useState<any>(null);
  const [selectedAssingStaff, setSelectedAssingStaff] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [updateBookingPrice] = useUpdateBookingPriceMutation();

  const [updateAssingStaff] = useUpdateAssingStaffMutation();

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1); // Reset to first page when searching
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data, isLoading, isFetching } = useGetBookingsQuery({
    page: currentPage,
    limit: itemsPerPage,
    search: debouncedSearch,
  });

  console.log("Helo", data?.data);

  const totalPages = data?.meta?.totalPages || 0;
  const totalItems = data?.meta?.total || 0;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setDebouncedSearch("");
    setCurrentPage(1);
  };

  const handlePriceSave = async (bookingId: string, newPrice: number) => {
    const toastId = toast.loading("Updating price...");
    try {
      await updateBookingPrice({ bookingId, price: newPrice }).unwrap();
      toast.success("Price updated successfully", { id: toastId });
      setPriceModalOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update price", {
        id: toastId,
      });
    }
  };

  const startItem = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <Card className="w-full bg-white text-black">
      <CardHeader className="space-y-2">
        <CardTitle className="text-xl leading-1">All Booking</CardTitle>
        <CardDescription>View and manage your booking</CardDescription>

        {/* Search Bar */}
        <div className="flex items-center gap-2 mt-2">
          {/* <div className="relative w-full max-w-sm">
            <Input
              placeholder="Search by name, email, service, staff..."
              className="pl-10 pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="size-5 absolute left-3 top-2.5 text-gray-400" />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <X className="size-5" />
              </button>
            )}
          </div>
          {debouncedSearch && (
            <div className="text-sm text-gray-600">
              {totalItems} result{totalItems !== 1 ? "s" : ""} found
            </div>
          )} */}
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4">User Name</th>
                <th className="p-4">Staff</th>
                <th className="p-4">Date</th>
                <th className="p-4">Location</th>
                <th className="p-4">Status</th>
                <th className="p-4">Price</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {isLoading || isFetching ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-gray-500">
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
                      Loading bookings...
                    </div>
                  </td>
                </tr>
              ) : data?.data?.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-gray-500">
                    {debouncedSearch ? (
                      <div>
                        <p className="font-medium">No bookings found</p>
                        <p className="text-xs mt-1">
                          Try adjusting your search terms
                        </p>
                      </div>
                    ) : (
                      "No bookings found."
                    )}
                  </td>
                </tr>
              ) : (
                data?.data?.map((booking: any) => (
                  <tr
                    key={booking._id || booking.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-4">
                      <p className="font-medium">
                        {booking.user?.name || "N/A"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {booking.user?.email || "N/A"}
                      </p>
                    </td>

                    {/* <td className="p-4">
                      {booking.serviceType?.title || "N/A"}
                    </td> */}

                    <td className="p-4 flex ">
                      <div className="">
                        <p className="font-medium">
                          {booking.staff?.name || "Not Assigned"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {booking.staff?.email || ""}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedAssingStaff(booking);
                          setAssingStaffOpen(true);
                        }}
                        className="hover:scale-110 transition-transform"
                        title="Edit price"
                      >
                        <Edit className="h-4 w-4 text-gray-600 hover:text-blue-600" />
                      </button>
                    </td>

                    <td className="p-4">
                      {booking.date
                        ? new Date(booking.date).toLocaleDateString()
                        : "N/A"}
                    </td>

                    <td className="p-4">
                      {booking?.address?.address && booking?.address?.city
                        ? `${booking.address.address}, ${booking.address.city}`
                        : "N/A"}
                    </td>

                    <td className="p-4">
                      <Badge
                        className={`px-3 py-1 rounded-full capitalize ${
                          booking.status === "confirmed" ||
                          booking.status === "active"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "scheduled" ||
                                booking.status === "pending"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {booking.status}
                      </Badge>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-500 text-white">
                          ${booking.price || 0}
                        </Badge>
                        <button
                          onClick={() => {
                            setSelectedBookingForPrice(booking);
                            setPriceModalOpen(true);
                          }}
                          className="hover:scale-110 transition-transform"
                          title="Edit price"
                        >
                          <Edit className="h-4 w-4 text-gray-600 hover:text-blue-600" />
                        </button>
                      </div>
                    </td>

                    <td className="p-4 text-center flex items-center justify-center gap-3">
                      <button
                        onClick={() => {
                          setSelectedBooking(booking);
                          setOpen(true);
                        }}
                        className="hover:scale-110 transition-transform"
                        title="View details"
                      >
                        <Eye className="h-5 w-5 text-gray-600 hover:text-black" />
                      </button>

                      {/* <button 
                        className="hover:scale-110 transition-transform"
                        title="Delete booking"
                      >
                        <Trash2 className="h-5 w-5 text-red-500 hover:text-red-600" />
                      </button> */}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {!isLoading && !isFetching && data?.data?.length > 0 && (
          <div className="flex items-center justify-between mt-4 px-2">
            <div className="text-sm text-gray-600">
              Showing {startItem} to {endItem} of {totalItems}{" "}
              {debouncedSearch ? "matching " : ""}bookings
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => {
                    // Show first page, last page, current page, and pages around current
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          className="w-9"
                        >
                          {page}
                        </Button>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <span key={page} className="px-1 text-gray-400">
                          ...
                        </span>
                      );
                    }
                    return null;
                  },
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Modals */}
        <BookingDetailsModal
          open={open}
          onClose={() => setOpen(false)}
          booking={selectedBooking}
        />

        {selectedBookingForPrice && (
          <PriceEditModal
            open={priceModalOpen}
            onClose={() => setPriceModalOpen(false)}
            currentPrice={selectedBookingForPrice.price || 0}
            bookingId={
              selectedBookingForPrice._id || selectedBookingForPrice.id
            }
            onSave={handlePriceSave}
          />
        )}

        {selectedAssingStaff && (
          <AssignStaffModal
            open={assingStaffOpen}
            onClose={() => setAssingStaffOpen(false)}
            bookingId={selectedAssingStaff._id || selectedAssingStaff.id}
            currentStaff={{
              _id: selectedAssingStaff.staff?._id,
              name: selectedAssingStaff.staff?.name,
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}
