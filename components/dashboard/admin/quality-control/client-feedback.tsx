"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReviewItem } from "@/lib/types/review.types";
import { SupportItem } from "@/lib/types/support.types";
import {
  useGetSupportQuery,
  useUpdateSupportStatusMutation,
} from "@/redux/features/quality-control/qualityControlApi";
import {
  useGetReviewQuery,
  useUpdateReviewStatusMutation,
} from "@/redux/features/review/reviewApis";
import { AlertCircle, CheckCircle, Star } from "lucide-react";
import { toast } from "sonner";

const statusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-blue-100 text-blue-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "rejected":
      return "bg-red-200 text-red-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const priorityStyle = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-200 text-red-700";
    case "medium":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const statusStyle = (status: string) => {
  switch (status) {
    case "in_progress":
      return "bg-gray-100 text-gray-600";
    case "solved":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-200 text-gray-700";
  }
};

// -----------------------------
// MAIN COMPONENT
// -----------------------------
export default function ClientFeedback() {
  const { data } = useGetSupportQuery(undefined);
  const { data: review } = useGetReviewQuery(undefined);

  console.log("useGetSupportQuery", review);

  const [updateSupportStatus, { isLoading }] = useUpdateSupportStatusMutation();
  const [updateReviewStatus, { isLoading: isReviewLoading }] =
    useUpdateReviewStatusMutation();

  // ISSUES & REPORTS TAB - Handle status update
  const handleUpdateStatus = async (id: string) => {
    try {
      const res = await updateSupportStatus({
        id,
        status: "solved",
      }).unwrap();

      if (res?.success) {
        toast.success(res?.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdateReviewStatus = async (id: string) => {
    try {
      const res = await updateReviewStatus({
        id,
        status: "solved",
      }).unwrap();

      if (res?.success) {
        toast.success(res?.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="feedback" className="w-full space-y-2">
        <TabsList className="bg-gray-200 rounded-lg ">
          <TabsTrigger value="feedback">Client Feedback</TabsTrigger>
          <TabsTrigger value="issues">Issues & Reports</TabsTrigger>
        </TabsList>

        {/* CLIENT FEEDBACK TAB */}
        <TabsContent value="feedback" className="bg-white p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-black">Service Feedback</h2>
          <p className="text-sm text-gray-500 mb-6">
            Review and respond to client feedback
          </p>

          <div className="space-y-6">
            {review?.data?.map((item: ReviewItem) => (
              <Card
                key={item?._id}
                className="border rounded-xl bg-gray-50 p-0"
              >
                <CardContent className="p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 capitalize">
                          {item?.reviewer?.name || "Anonymous"}
                        </h3>
                        <Badge className={statusColor(item.status)}>
                          <span className="capitalize">{item.status}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {item.bookingId?.serviceType?.title} by
                        <span className="font-medium">
                          {item.reviewer?.name}
                        </span>
                      </p>
                      <p className="text-xm text-gray-400">
                        {" "}
                        {new Date(item.createdAt).toISOString().slice(0, 10)}
                      </p>
                    </div>

                    {/* rating */}
                    <div className="flex text-yellow-500">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-500" />
                      ))}
                    </div>
                  </div>

                  {/* comment */}
                  <div className="text-sm  bg-gray-200/70 p-3 rounded-lg text-gray-800">
                    {item.review}
                  </div>

                  {/* actions */}
                  {item.status === "pending" && (
                    <Button
                      size="sm"
                      onClick={() => {
                        handleUpdateReviewStatus(item?._id);
                      }}
                    >
                      {isReviewLoading ? (
                        "Approveing..."
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </>
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ISSUES & REPORTS TAB */}

        <TabsContent value="issues" className="bg-white p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-black">Issues & Reports</h2>
          <p className="text-sm text-gray-500 mb-6">
            Track and resolve client complaints
          </p>

          <div className="space-y-6">
            {data?.data?.map((item: SupportItem) => (
              <Card
                key={item?._id}
                className="border rounded-xl bg-gray-50 p-0"
              >
                <CardContent className="p-6 space-y-4">
                  {/* Header */}
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.userId?.name}
                      </h3>

                      <Badge className={priorityStyle(item.priority)}>
                        <span className="capitalize">{item.priority}</span>
                      </Badge>

                      <Badge className={statusStyle(item.status)}>
                        {item.status}
                      </Badge>
                    </div>

                    <p className="text-base text-gray-700">
                      {item.bookingId?.serviceType?.title} by{" "}
                      <span className="font-medium">
                        {item.bookingId?.staff?.name}
                      </span>
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(item.createdAt).toISOString().slice(0, 10)}
                    </p>
                  </div>

                  {/* Issue description */}
                  <div className="flex items-start gap-2 text-lg text-gray-700 bg-gray-200/60 p-3 rounded-lg">
                    <AlertCircle className="size-5 text-red-500 mt-0.5" />
                    {item.message}
                  </div>

                  {/* Action buttons */}
                  {item.status === "in_progress" && (
                    <Button
                      size="sm"
                      className="text-white bg-black"
                      onClick={() => handleUpdateStatus(item?._id)}
                    >
                      {isLoading ? (
                        "Resolveing..."
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Resolve
                        </>
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
