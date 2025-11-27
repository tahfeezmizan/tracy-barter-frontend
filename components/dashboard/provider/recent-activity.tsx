import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle, Star } from "lucide-react";

const recentData = [
  {
    service: "Home Cleaning",
    customer: "John Smith",
    date: "Oct 24, 2025",
    rating: 5,
  },
  {
    service: "Grocery Shopping",
    customer: "Lisa Brown",
    date: "Oct 23, 2025",
    rating: 5,
  },
  {
    service: "Home Maintenance",
    customer: "David Lee",
    date: "Oct 22, 2025",
    rating: 4,
  },
];

export function RecentActivity() {
  return (
    <Card className="w-full bg-white text-black">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Activity</CardTitle>
          <p className="text-sm text-gray-500">
            Your recently completed services
          </p>
        </div>
        <Button className="text-sm  bg-gray-100 border border-gray-200">
          View All
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {recentData.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border"
          >
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-600" size={22} />
              <div>
                <p className="font-medium">
                  {item.service} • {item.customer}
                </p>
                <p className="text-sm text-gray-500">{item.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Star className="text-yellow-500" size={18} />
              <span className="font-medium">{item.rating}.0</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
