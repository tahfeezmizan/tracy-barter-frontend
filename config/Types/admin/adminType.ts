import { LucideIcon } from "lucide-react";

export type RevenueTrendItem = {
  month: string;
  revenue: number;
};

export type ServiceRequestItem = {
  month: string;
  count: number;
};

export type AdminStatsResponse = {
  totalClients: number;
  activeServices: number;
  totalRevenue: number;
  activeStaff: number;
  revenueTrend: RevenueTrendItem[];
  serviceRequests: ServiceRequestItem[];
};

export type StatsCardItem = {
  title: string;
  value?: number;
  icon: LucideIcon;
};
