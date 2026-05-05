"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoadingSpinner from "@/lib/loading-spinner";
import { recentService } from "@/lib/types/recentServiceTypes";
import { usePathname } from "next/navigation";

export default function RecentServices({
  data,
  loading,
}: {
  data: any;
  loading: boolean;
}) {
  const pathname = usePathname();

  const statusColor = {
    confirmed: "bg-green-100 text-green-700",
    inProgres: "bg-blue-100 text-blue-700",
    scheduled: "bg-yellow-100 text-yellow-700",
  };

  const displayedData = pathname === "/dashboard" ? data?.slice(0, 5) : data;

  return (
    <Card className="w-full bg-white text-black">
      <CardHeader>
        <CardTitle>Recent Services</CardTitle>
        <CardDescription>
          Latest service bookings and their status
        </CardDescription>
      </CardHeader>

      <CardContent>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="space-y-4">
            {displayedData?.map((item: recentService, i: number) => (
              <div
                key={i}
                className="flex flex-col md:flex-row md:items-center justify-between border rounded-lg p-4 bg-white"
              >
                <div>
                  <p className="text-lg font-semibold">{item?.user?.name}</p>
                  <p className="text-sm text-gray-500">{item?.service}</p>
                </div>

                <div className="flex flex-col items-end justify-end gap-2 mt-3 md:mt-0">
                  <p className="font-medium">Staff Name: <span className="font-semibold capitalize">{item?.staff?.name || " Not assigned yet"}</span></p>
                  <Badge
                    className={`${
                      statusColor[item.status as keyof typeof statusColor]
                    } px-3 py-1 rounded-full text-xs font-medium`}
                  >
                    {item.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
