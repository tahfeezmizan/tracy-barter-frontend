
export interface StaffProfile {
  _id: string;
  id: string;

  name: string;
  email: string;
  phone: string;
  description: string;
  role: string;

  profile: string | null;

  avgRating: number;
  completedServiceCount: number;

  status: "active" | "inactive";
  isAvailable: boolean;
  verified: boolean;
  subscribe: boolean;

  paymentType: "Monthly" | "Yearly" | string;
  timezone: string;

  location: Location;
  services: Service[];

  createdAt: string;
  updatedAt: string;
}

/* ================================
   Location (GeoJSON)
================================ */

export interface Location {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
}

/* ================================
   Services
================================ */

export interface Service {
  _id: string;
  name: string;
}

/* ================================
   Optional API Response Wrapper
================================ */

export interface StaffProfileResponse {
  success: boolean;
  data: StaffProfile;
}
