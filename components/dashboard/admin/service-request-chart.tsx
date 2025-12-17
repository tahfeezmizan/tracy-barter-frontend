"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ServiceRequestItem } from "@/config/Types/admin/adminType";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type ServiceRequestItemProps = {
  data?: ServiceRequestItem[];
};

export default function ServiceRequestChart({ data }: ServiceRequestItemProps) {
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
