"use client";

import { useGetQualityControlStatsQuery } from "@/redux/features/quality-control/qualityControlApi";
import {
  CircleAlert,
  CircleCheckBig,
  MessageSquare,
  Star
} from "lucide-react";
import DynamicHeader from "../../dynamic-header";
import StatsCard from "../../stats-card";
import ClientFeedback from "./client-feedback";

export default function QualityControlPage() {
  const { data } = useGetQualityControlStatsQuery(undefined);

  const stats = [
    {
      title: "Avg Rating",
      value: data?.averageRating,
      icon: Star,
    },
    {
      title: "Pending Reviews",
      value: data?.pendingReviews,
      icon: MessageSquare,
    },
    {
      title: "Open Issues",
      value: data?.openIssues,
      icon: CircleAlert,
    },
    {
      title: "Satisfaction Rate",
      value: data?.satisfactionRate,
      icon: CircleCheckBig,
    },
  ];

  return (
    <div className="space-y-6">
      <DynamicHeader
        title={"Quality Control"}
        des="Monitor service quality and handle issues"
      />
      <StatsCard stats={stats} />
      <ClientFeedback />
    </div>
  );
}
