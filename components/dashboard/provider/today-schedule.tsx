import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Clock, Play, Eye, CheckCircle } from "lucide-react";
import { ServiceDetailsModal } from "./service-metails-modal";
import { Button } from "@/components/ui/button";

const scheduleData = [
  {
    service: "Home Cleaning",
    time: "9:00 AM - 11:00 AM",
    status: "In Progress",
    customer: "Sarah Johnson",
    address: "123 Oak Street, Springfield",
    initials: "SJ",
    action: "Complete",
    phone: "(555) 123-4567",
    notes:
      "Please focus on kitchen and bathrooms. Pet-friendly products preferred.",
  },
  {
    service: "Grocery Shopping",
    time: "2:00 PM - 3:00 PM",
    status: "Upcoming",
    customer: "Mike Davis",
    address: "456 Maple Avenue, Springfield",
    initials: "MD",
    action: "Start Service",
    phone: "(555) 123-4567",
    notes:
      "Please focus on kitchen and bathrooms. Pet-friendly products preferred.",
  },
  {
    service: "Home Cleaning",
    time: "4:00 PM - 6:00 PM",
    status: "Upcoming",
    customer: "Emily Wilson",
    address: "789 Pine Road, Springfield",
    initials: "EW",
    action: "Start Service",
    phone: "(555) 123-4567",
    notes:
      "Please focus on kitchen and bathrooms. Pet-friendly products preferred.",
  },
];

export function TodaysSchedule() {
  return (
    <div className="w-full bg-white text-black p-6 rounded-xl">
      <div className="flex flex-col mb-6">
        <h2 className="text-xl font-semibold">Today's Schedule</h2>
        <p className="text-gray-500 text-sm">
          Your upcoming appointments for today
        </p>
      </div>

      <div className="space-y-4">
        {scheduleData.map((item, index) => (
          <Card key={index} className="w-full">
            <CardContent className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Left Section */}
              <div className="flex items-start gap-4 max-md:flex-col">
                <Clock className="text-gray-600 mt-1" />
                <div>
                  <p className="font-semibold text-lg flex items-center gap-2">
                    {item.service}
                    <span
                      className={`text-xs px-2 py-1 rounded-full border ${
                        item.status === "In Progress"
                          ? "bg-blue-100 text-blue-700 border-blue-200"
                          : "bg-gray-100 text-gray-600 border-gray-300"
                      }`}
                    >
                      {item.status}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">{item.time}</p>

                  <div className="flex items-center gap-3 mt-2">
                    <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-semibold">
                      {item.initials}
                    </div>
                    <div>
                      <p className="font-medium">{item.customer}</p>
                      <p className="text-sm text-gray-500">{item.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Buttons */}
              <div className="flex items-center gap-3 self-start md:self-center">
                {/* <Button className="flex items-center gap-1 border px-3 py-2 rounded-lg text-sm hover:bg-gray-100">
                  <Eye size={16} /> View Details
                </Button> */}
                <ServiceDetailsModal data={item}>
                  <Button className="flex items-center gap-1 border px-3 py-2 rounded-lg text-sm bg-slate-50 border-gray-300 hover:bg-gray-100">
                    <Eye size={16} /> View Details
                  </Button>
                </ServiceDetailsModal>

                <Button
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm text-white bg-secondary hover:bg-primary ${
                    item.action === "Complete"
                      ? "bg-secondary "
                      : "bg-secondary "
                  }`}
                >
                  {item.action === "Complete" ? (
                    <CheckCircle size={16} />
                  ) : (
                    <Play size={16} />
                  )}
                  {item.action}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
