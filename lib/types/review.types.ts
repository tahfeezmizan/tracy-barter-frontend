export interface ReviewItemType {
  _id: string;
  title: string;
  review: string;
  rating: number;
  status: "pending" | "in_progress" | "solved";
  bookingId: Booking;
  reviewer: Reviewer;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Booking {
  _id: string;
  id: string;
  googleMapsUrl: string;
  userPhoneUrl: string | null;
  serviceType: ServiceType;
  staff: Staff;
}

export interface ServiceType {
  title: string;
}

export interface Staff {
  _id: string;
  id: string;
  name: string;
  profile: string;
}

export interface Reviewer {
  _id: string;
  id: string;
  name: string;
  email: string;
}
