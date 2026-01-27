
export interface PlanFeature {
  name: string;
  included: boolean;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  period: 'month' | 'year' | 'once';
  features: PlanFeature[];
  popular?: boolean;
  description: string;
  originalPrice?: number;
  discount?: number;
  stripePriceId?: string;
  razorpayPlanId?: string | null;
}
