// types/service.types.ts
export interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
  bookings: number;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
  image: string;
  occasions: string[];
  serviceType: ServiceType[];
  servicesProvided: string[];
  staff: any[];
}

export interface ServiceType {
  _id: string;
  title: string;
  description: string;
}

export interface Meta {
  page: number;
  limit: number;
  totalPages: number;
  total: number;
}

export interface ServicesResponse {
  data: Service[];
  meta: Meta;
}
