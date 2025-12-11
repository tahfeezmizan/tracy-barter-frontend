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
