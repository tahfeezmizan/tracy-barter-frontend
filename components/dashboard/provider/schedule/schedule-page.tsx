"use client";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetScheduledBookingsByDateQuery } from "@/redux/features/staff/staffApis";
import React from "react";
import AppointmentList from "./appointment-list";
import WeeklyOverview from "./weekly-overview";

export default function SchedulePage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [month, setMonth] = React.useState<Date>(new Date());

  const formattedDate = React.useMemo(() => {
    if (!date) return "";
    return date.toLocaleDateString("en-CA");
  }, [date]);

  const { data, isLoading } = useGetScheduledBookingsByDateQuery(
    formattedDate,
    { skip: !formattedDate }
  );

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <Card className="w-full bg-white text-black">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Calendar</CardTitle>
              <p className="text-sm text-muted-foreground">
                Select a date to view appointments
              </p>
            </CardHeader>
            <CardContent className="p-0 w-md mx-auto flex flex-col items-center justify-between">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                month={month}
                onMonthChange={setMonth}
                required={false}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </div>

        <div className="flex-1">
          <AppointmentList data={data} date={date} loading={isLoading} />
        </div>
      </div>

      <WeeklyOverview />
    </div>
  );
}
