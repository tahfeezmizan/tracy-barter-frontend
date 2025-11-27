import React from "react";
import CalendarView from "./calendar-view";
import AppointmentList from "./appointment-list";
import WeeklyOverview from "./weekly-overview";

export default function SchedulePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1 ">
          <CalendarView />
        </div>
        <div className="flex-1">
          <AppointmentList />
        </div>
      </div>
      <WeeklyOverview />
    </div>
  );
}
