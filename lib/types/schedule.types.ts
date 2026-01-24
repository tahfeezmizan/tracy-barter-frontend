interface Coordinates {
  type: "Point";
  coordinates: [number, number];
}

interface Address {
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

interface ServiceDetail {
  id: string;
  name: string;
  value: string | number | boolean;
  _id: string;
}

interface ServiceType {
  title: string;
  description: string;
}

interface User {
  email: string;
  id: string;
  name: string;
  phone: string;
  role: string;
  services: any[];
  status: string;
  subscribe: boolean;
  timezone: string;
  verified: boolean;
  _id: string;
  userPhoneUrl?: string;
}

export interface AppointmentsBooking {
  _id: string;
  id: string;
  date: string; // ISO string
  startTime: string;
  endTime: string;
  bookingFee: number;
  bookingFeeStatus: string;
  serviceCharge: number;
  serviceChargeStatus: string;
  status: string;
  notes?: string;
  isInvoiced: boolean;
  createdAt: string;
  updatedAt: string;
  googleMapsUrl?: string;
  location: Coordinates;
  address: Address;
  service: string;
  serviceType: ServiceType;
  serviceDetails: ServiceDetail[];
  staff: string;
  user: User;
  price?: number;
  length: number;
  avatarColor?: string;
}
