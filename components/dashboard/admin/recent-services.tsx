import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ServiceItem {
  name: string;
  service: string;
  assignedTo: string;
  status: "Completed" | "In Progress" | "Scheduled";
}

const services: ServiceItem[] = [
  {
    name: "John Smith",
    service: "Home Cleaning",
    assignedTo: "Maria Johnson",
    status: "Completed",
  },
  {
    name: "Sarah Davis",
    service: "Grocery Shopping",
    assignedTo: "David Lee",
    status: "In Progress",
  },
  {
    name: "Mike Wilson",
    service: "Maintenance",
    assignedTo: "Sarah Williams",
    status: "Scheduled",
  },
  {
    name: "Emily Brown",
    service: "Home Cleaning",
    assignedTo: "Maria Johnson",
    status: "Completed",
  },
];

export default function RecentServices() {
  const statusColor = {
    Completed: "bg-green-100 text-green-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Scheduled: "bg-yellow-100 text-yellow-700",
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
        {services.map((item, i) => (
          <div
            key={i}
            className="flex flex-col md:flex-row md:items-center justify-between border rounded-lg p-4 bg-white"
          >
            <div>
              <p className="text-lg font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">{item.service}</p>
            </div>

            <div className="flex items-center gap-4 mt-3 md:mt-0">
              <p className="text-sm text-gray-800">{item.assignedTo}</p>
              <Badge
                className={`${
                  statusColor[item.status]
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
