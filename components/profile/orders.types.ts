/**
 * Type definitions for Order-related components
 */

import type { LucideIcon } from "lucide-react";

/** Order status types */
export type OrderStatus = "Pending" | "Completed" | "Cancelled";

/** Order data structure */
export interface Order {
  id: number;
  service: string;
  status: OrderStatus;
  customer: string;
  date: string;
  address: string;
  price: string;
  progress: number;
  statusIcon: LucideIcon;
  statusColor: string;
  bgColor: string;
}

/** Filter type for orders */
export type OrderFilter = "all" | "pending" | "completed";
