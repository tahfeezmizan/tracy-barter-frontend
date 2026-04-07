"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { useUpdateAssingStaffMutation } from "@/redux/features/booking/bookingApi";
import { useGetStaffQuery } from "@/redux/features/service/clientApis";

interface AssignStaffModalProps {
  open: boolean;
  onClose: () => void;
  bookingId: string;
  currentStaff?: {
    _id: string;
    name: string;
  };
}

export function AssignStaffModal({
  open,
  onClose,
  bookingId,
  currentStaff,
}: AssignStaffModalProps) {
  const [staffId, setStaffId] = useState("");
  const [updateAssingStaff] = useUpdateAssingStaffMutation();

  const { data, isLoading } = useGetStaffQuery({ page: 1, limit: 20 });
  const staffData = data?.data || [];

  // ✅ Filter active staff
  const filteredStaff = useMemo(() => {
    if (!staffData?.length) return [];

    return staffData.filter((staff: any) => {
      const isActive = staff.status === "active";

      // If bookingId-specific relation exists
      if (bookingId && staff.bookingIds) {
        return isActive && staff.bookingIds.includes(bookingId);
      }

      // Default → only active
      return isActive;
    });
  }, [staffData, bookingId]);

  useEffect(() => {
    if (currentStaff?._id) {
      setStaffId(currentStaff._id);
    } else {
      setStaffId("");
    }
  }, [currentStaff, open]);

  const handleSave = async () => {
    if (!staffId) return;

    const toastId = toast.loading("Updating staff...");

    try {
      const res = await updateAssingStaff({
        bookingId,
        staffId,
      }).unwrap();

      toast.success("Staff assigned successfully", { id: toastId });
      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to assign staff", {
        id: toastId,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white p-0">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Assign Staff
            </DialogTitle>
            {/* <button
              onClick={onClose}
              className="rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </button> */}
          </div>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="staff" className="text-sm text-gray-700">
              Staff Name
            </Label>

            <Select value={staffId} onValueChange={setStaffId}>
              <SelectTrigger className="w-full text-gray-900">
                <SelectValue placeholder="Select Staff" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {isLoading ? (
                  <SelectItem value="loading" disabled>
                    Loading...
                  </SelectItem>
                ) : filteredStaff.length === 0 ? (
                  <SelectItem value="no-data" disabled>
                    No active staff available
                  </SelectItem>
                ) : (
                  filteredStaff.map((staff: any) => (
                    <SelectItem key={staff._id} value={staff._id}>
                      {staff.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={onClose} className="flex-1 h-11">
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 h-11 bg-slate-900 hover:bg-slate-800 text-white"
            >
              Assign Staff
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
