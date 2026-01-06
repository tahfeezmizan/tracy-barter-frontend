export interface ReferralItem {
  _id: string;
  yourName: string;
  referralName: string;
  referralEmail: string;
  referralPhone: string; 
  notes: string;
  referredBy: string | null;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
  __v: number;
}
