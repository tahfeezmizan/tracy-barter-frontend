/* ===============================
   API RESPONSE
================================ */

export type ApiResponse = Booking[];

/* ===============================
   BOOKING
================================ */

export interface Booking {
  _id: string;
  id: string;

  amount: number;
  price: number;

  status: "pending" | "completed" | "cancelled";

  createdAt: string;
  updatedAt: string;

  date: string;
  startTime: string;
  endTime: string;

  bookingFee: number;
  bookingFeeStatus: "paid" | "unpaid";

  serviceCharge: number;
  serviceChargeStatus: "paid" | "unpaid";

  isInvoiced: boolean;

  notes?: string;
  googleMapsUrl?: string;

  paymentId?: string;
  transactionId?: string;

  paymentGateway: "stripe";
  paymentType: "service_charge";

  booking: BookingWrapper;
  location: GeoLocation;

  service: string; // service ID
  serviceType: ServiceType;

  serviceDetails: ServiceDetail[];

  staff?: string;
  user: User;

  __v: number;
}

/* ===============================
   BOOKING ADDRESS
================================ */

export interface BookingWrapper {
  address: Address;
}

export interface Address {
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

/* ===============================
   GEO LOCATION
================================ */

export interface GeoLocation {
  type: "Point";
  coordinates: [number, number];
}

/* ===============================
   SERVICE
================================ */

export interface ServiceType {
  title: string;
  description: string;
}

/* ===============================
   SERVICE DETAILS (DYNAMIC FIELDS)
================================ */

export interface ServiceDetail {
  _id: string;
  id: string;
  name: string;
  value: string | number | boolean;
}

/* ===============================
   USER
================================ */

export interface User {
  _id: string;
  id: string;

  name: string;
  email: string;
  phone: string;

  role: "admin" | "user" | "staff";
  status: "active" | "inactive";

  subscribe: boolean;
  verified: boolean;

  timezone: string;

  location: GeoLocation;

  authentication: Authentication;

  createdAt: string;
  updatedAt: string;

  __v: number;
}

/* ===============================
   AUTHENTICATION
================================ */

export interface Authentication {
  latestRequestAt: string;
  requestCount: number;
  wrongLoginAttempts: number;
  resetPassword: boolean;
  restrictionLeftAt: string | null;
}
