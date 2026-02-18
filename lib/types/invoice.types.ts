export interface Booking {
  _id: string;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
  price: number;
  bookingFee: number;
  serviceCharge: number;
  bookingFeeStatus: 'paid' | 'unpaid' | 'pending';
  serviceChargeStatus: 'paid' | 'unpaid' | 'pending';
  googleMapsUrl: string;
  userPhoneUrl: string | null;
  id: string;
}

export interface Invoice {
  _id: string;
  user: string;
  bookings: Booking[];
  month: string;
  totalAmount: number;
  status: 'pending' | 'paid' | 'overdue';
  createdAt: string;
  updatedAt: string;
  __v?: number;
}
