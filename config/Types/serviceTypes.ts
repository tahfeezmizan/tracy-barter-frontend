export interface BookingFormData {
  serviceType: string | null;

  [key: string]: any;

  provider: string;
  providerName: string;
  isOutdoor: boolean;

  date?: Date;
  startTime?: string;
  endTime?: string;

  address: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };

  name: string;
  email: string;
  phone: string;
  note: string;

  serviceDetails?: {
    name: string;
    value: any;
  }[];
}

export interface ServiceResponse {
  _id: string;
  name: string;
  description: string;
  image: string;
  status: "active" | "inactive";

  serviceType: ServiceType[];
  fields: ServiceField[];
  staff: StaffMember[];

  occasions: string[];
  servicesProvided: string[];

  createdBy: string;
  createdAt: string;
  updatedAt: string;

  __v: number;
}

export interface ServiceType {
  _id: string;
  title: string;
  description: string;
}

export type ServiceFieldType = "string" | "number" | "boolean";

export interface ServiceField {
  _id: string;
  name: string;
  label: string;
  type: ServiceFieldType;
}

export interface StaffMember {
  _id: string;
  id: string;
  name: string;
  email: string;
}
