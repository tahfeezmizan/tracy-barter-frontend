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
