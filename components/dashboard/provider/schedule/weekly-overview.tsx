"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const weekData = [
  { day: "Mon", date: 21, services: 2 },
  { day: "Tue", date: 22, services: 0 },
  { day: "Wed", date: 23, services: 0 },
  { day: "Thu", date: 24, services: 0 },
  { day: "Fri", date: 25, services: 2, selected: true },
  { day: "Sat", date: 26, services: 1 },
  { day: "Sun", date: 27, services: 2 },
];

export default function WeeklyOverview() {
  const totalServices = weekData.reduce((sum, d) => sum + d.services, 0);

  return (
    <div className="w-full rounded-xl border bg-white text-black p-6">
      <h2 className="text-lg font-semibold">This Week's Overview</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Total appointments: {totalServices} services scheduled
      </p>

      {/* Scrollable row on mobile */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {weekData.map((item) => (
          <Card
            key={item.day}
            className={cn(
              "w-full flex flex-col items-center p-4 rounded-xl",
              item.selected
                ? "bg-secondary text-white shadow-lg"
                : "bg-gray-100"
            )}
          >
            <span className="text-sm">{item.day}</span>
            <span className="text-2xl font-semibold">{item.date}</span>
            <span className="text-xs mt-1">
              {item.services} {item.services === 1 ? "service" : "services"}
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
}
