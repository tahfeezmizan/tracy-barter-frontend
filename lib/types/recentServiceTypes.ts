// Booking status type
export type BookingStatus =
  | "confirmed"
  | "inProgress"
  | "completed"
  | "cancelled"
  | "requested"
  | "scheduled";

// User type
export interface User {
  _id: string;
  name: string;
}

// Staff type
export interface Staff {
  _id: string;
  name: string;
}

// Booking type
export interface recentService {
  _id: string;
  date: string; // ISO date string (e.g. "2025-01-20T00:00:00.000Z")
  price: number;
  service: string;
  status: BookingStatus;
  user: User;
  staff: Staff;
}
