"use client";

import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";

export default function CalendarView() {
  const [date, setDate] = React.useState(new Date(2025, 9, 28));

  return (
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
          month={date}
          onMonthChange={setDate}
          className="rounded-md border"
        />
      </CardContent>
    </Card>
  );
}
