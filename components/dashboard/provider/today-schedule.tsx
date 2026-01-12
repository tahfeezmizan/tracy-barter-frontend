import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import LoadingSpinner from "@/lib/loading-spinner";
import {
  useGetUpcomingScheduleQuery,
  useUpdateBookingStatusMutation,
} from "@/redux/features/staffdashboard/staffStatsApis";
import {
  CheckCircle,
  Clock,
  MapPin,
  Play
} from "lucide-react";
import { toast } from "sonner";

export function TodaysSchedule() {
  const statusClasses: Record<string, string> = {
    confirmed: "bg-purple-100 text-purple-700 border-purple-200",
    scheduled: "bg-yellow-100 text-yellow-700 border-yellow-200",
    inProgress: "bg-blue-100 text-blue-700 border-blue-200",
    completed: "bg-green-100 text-green-700 border-green-200",
    cancelled: "bg-red-100 text-red-700 border-red-200",
    requested: "bg-gray-100 text-gray-700 border-gray-300",
  };

  const { data, isLoading } = useGetUpcomingScheduleQuery(undefined);
  const [updateBookingStatus, { isLoading: isUpdating }] =
    useUpdateBookingStatusMutation();

  const handleUpdateStatus = async (
    bookingId: string,
    currentStatus: string
  ) => {
    let nextStatus = "";

    if (currentStatus === "scheduled") {
      nextStatus = "inProgress";
    } else if (currentStatus === "inProgress") {
      nextStatus = "completed";
    } else {
      return;
    }

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

  return (
    <div className="w-full bg-white text-black p-6 rounded-xl">
      <div className="flex flex-col mb-6">
        <h2 className="text-xl font-semibold">Today's Schedule</h2>
        <p className="text-gray-500 text-sm">
          Your upcoming appointments for today
        </p>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="">
            {data?.map((item: any, index: number) => (
              <Card key={index} className="w-full py-2">
                <CardContent className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Left Section */}
                  <div className="flex items-start gap-4 max-md:flex-col">
                    <Clock className="text-gray-600 mt-1" />
                    <div>
                      <p className="font-semibold text-lg flex items-center gap-2">
                        {item?.serviceType?.title}
                        <span
                          className={`text-xs px-2 py-1 rounded-full border capitalize ${
                            statusClasses[item?.status] ||
                            "bg-gray-100 text-gray-600 border-gray-300"
                          }`}
                        >
                          {item?.status}
                        </span>
                      </p>

                      <p className="text-sm text-gray-500">
                        {new Date(item?.date).toLocaleDateString()}
                      </p>

                      <div className="flex items-center gap-3 mt-2">
                        <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-semibold">
                          {item?.user?.name?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{item?.user?.name}</p>
                          <div className="flex items-center gap-2">
                            <MapPin className="size-4" />{" "}
                            <p className="text-sm text-gray-500">
                              {item?.address?.address}, {item?.address?.city}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Buttons */}
                  <div className="flex items-center gap-3 self-start md:self-center">
                    {/* <ServiceDetailsModal data={item}>
                  <Button className="flex items-center gap-1 border px-3 py-2 rounded-lg text-sm bg-slate-50 border-gray-300 hover:bg-gray-100">
                    <Eye size={16} /> View Details
                  </Button>
                </ServiceDetailsModal> */}

                    {(item?.status === "scheduled" ||
                      item?.status === "inProgress") && (
                      <Button
                        disabled={isUpdating}
                        onClick={() =>
                          handleUpdateStatus(item?._id, item?.status)
                        }
                        className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm text-white bg-secondary hover:bg-primary"
                      >
                        {item?.status === "scheduled" ? (
                          <Play size={16} />
                        ) : (
                          <CheckCircle size={16} />
                        )}

                        {item?.status === "scheduled"
                          ? "Start Service"
                          : "Complete Service"}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
