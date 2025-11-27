"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "May", value: 45 },
  { month: "Jun", value: 52 },
  { month: "Jul", value: 61 },
  { month: "Aug", value: 58 },
  { month: "Sep", value: 67 },
  { month: "Oct", value: 74 },
];

export default function ServiceRequestChart() {
  return (
    <Card className="w-full bg-white text-black">
      <CardHeader>
        <CardTitle>Service Requests</CardTitle>
        <CardDescription>Monthly service bookings over time</CardDescription>
      </CardHeader>

      <CardContent className="h-96">
        {/* Responsive container makes chart auto-scale */}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
