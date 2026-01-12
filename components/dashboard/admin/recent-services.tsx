import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { recentService } from "@/lib/types/recentServiceTypes";

export default function RecentServices(data: any) {
  // console.log("staffRecentService", data);

  const statusColor = {
    confirmed: "bg-green-100 text-green-700",
    inProgres: "bg-blue-100 text-blue-700",
    scheduled: "bg-yellow-100 text-yellow-700",
  };

  return (
    <Card className="w-full bg-white text-black">
      <CardHeader>
        <CardTitle>Recent Services</CardTitle>
        <CardDescription>
          Latest service bookings and their status
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {data?.data?.map((item: recentService, i: string) => (
          <div
            key={i}
            className="flex flex-col md:flex-row md:items-center justify-between border rounded-lg p-4 bg-white"
          >
            <div>
              <p className="text-lg font-semibold">{item?.user?.name}</p>
              <p className="text-sm text-gray-500">{item?.service}</p>
            </div>

            <div className="flex items-center gap-4 mt-3 md:mt-0">
              {/* <p className="text-sm text-gray-800">{item.assignedTo}</p> */}
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
      </CardContent>
    </Card>
  );
}
