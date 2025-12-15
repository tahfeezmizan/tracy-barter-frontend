export interface PricingPlanType {
  _id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  paymentType: string;
  status: string;
  features: string[];

  limits: {
    session: number;
  };

  productId: string;
  priceId: string;

  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ServiceItem {
  _id: string;
  name: string;
  description: string;
  image: string;

  status: "active" | "inactive";

  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  createdBy: string;
  __v: number;

  occasions: string[];
  servicesProvided: string[];

  fields: ServiceField[]; // adjust if needed
  serviceType: ServiceType[]; // adjust if needed
  staff: StaffMember[]; // adjust if needed
}

export interface ServiceField {
  [key: string]: any;
}

export interface ServiceType {
  [key: string]: any;
}

export interface StaffMember {
  [key: string]: any;
}

export interface Reviewer {
  _id: string;
  id: string;
  name: string;
  profile: string;
  role: "staff" | "admin" | "user"; // extend if needed
}

export interface ReviewTypes {
  _id: string;
  title: string;
  review: string;
  rating: number;
  status: "pending" | "approved" | "rejected"; // adjust based on backend
  service: string;
  reviewer: Reviewer;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

export interface FAQTypes {
  _id: string;
  question: string;
  answer: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}
