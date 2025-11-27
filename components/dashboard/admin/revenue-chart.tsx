"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const data = [
  { month: "May", revenue: 5400 },
  { month: "Jun", revenue: 6200 },
  { month: "Jul", revenue: 7100 },
  { month: "Aug", revenue: 6800 },
  { month: "Sep", revenue: 8000 },
  { month: "Oct", revenue: 8600 },
];

export default function RevenueChart() {
  return (
    <Card className="w-full rounded-2xl bg-white text-black" >
      <CardHeader>
        <CardTitle>Revenue Trend</CardTitle>
        <CardDescription>Monthly revenue over time</CardDescription>
      </CardHeader>

      {/* Responsive chart container */}
      <CardContent className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            {/* Dotted Grid */}
            <CartesianGrid strokeDasharray="4 4" />

            <XAxis dataKey="month" />
            <YAxis />

            <Tooltip />

            {/* The line */}
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#000"
              strokeWidth={2}
              dot={{ stroke: "#000", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
