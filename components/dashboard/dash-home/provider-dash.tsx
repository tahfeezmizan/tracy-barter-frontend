import React from "react";
import StatsCard from "../stats-card";
import { Calendar, CircleCheckBig, Star, TrendingUp, User } from "lucide-react";
import { RecentActivity } from "../provider/recent-activity";
import { TodaysSchedule } from "../provider/today-schedule";

export default function ProviderDash() {
  const stats = [
    {
      title: "Today's Services",
      value: "3",
      icon: Calendar,
    },
    {
      title: "Completed Services",
      value: "156",
      icon: CircleCheckBig,
    },
    {
      title: "Your Rating ",
      value: "4.8⭐",
      icon: Star,
    },
    {
      title: "This Week",
      value: "25",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-6">
      <StatsCard stats={stats} />
      <TodaysSchedule />
      <RecentActivity />
    </div>
  );
}
