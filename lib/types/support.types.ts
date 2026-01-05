export interface SupportItem {
  _id: string;
  userId: User;
  message: string;
  bookingId: Booking;
  status: SupportStatus;
  priority: SupportPriority;
  attachments: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  id: string;
}

export interface Booking {
  _id: string;
  serviceType: ServiceType;
  staff: Staff;
  googleMapsUrl: string;
  userPhoneUrl: string | null;
  id: string;
}

export interface ServiceType {
  title: string;
}

export interface Staff {
  _id: string;
  name: string;
  profile: string;
  id: string;
}

export type SupportStatus = "pending" | "in_progress" | "solved";
export type SupportPriority = "low" | "medium" | "high";
