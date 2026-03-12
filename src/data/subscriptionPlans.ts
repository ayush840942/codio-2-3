
import { Plan } from '@/types/subscription';

export const subscriptionPlans: Plan[] = [
  {
    id: 'free',
    name: 'Free Plan',
    description: 'Perfect for getting started with coding',
    price: 0,
    originalPrice: 0,
    period: 'month',
    features: [
      { name: 'Access to first 50 levels', included: true },
      { name: 'Basic HTML & CSS lessons', included: true },
      { name: 'Community support', included: true },
      { name: 'Basic progress tracking', included: true },
      { name: 'Limited hints (50 per week)', included: true },
      { name: 'Advanced lessons', included: false },
      { name: 'Unlimited hints', included: false },
      { name: 'Priority support', included: false }
    ],
    popular: false,
    stripePriceId: '',
    razorpayPlanId: null
  },
  {
    id: 'premium-monthly',
    name: 'Premium Monthly',
    description: 'Unlock your full coding potential with monthly billing',
    price: 299,
    originalPrice: 499,
    period: 'month',
    features: [
      { name: 'Access to all 200+ levels', included: true },
      { name: 'Complete HTML, CSS, JavaScript course', included: true },
      { name: 'React & Advanced frameworks', included: true },
      { name: 'Unlimited context-aware hints', included: true },
      { name: 'Interactive coding playground', included: true },
      { name: 'Personal progress analytics', included: true },
      { name: 'Priority email support', included: true },
      { name: 'Downloadable certificates', included: true },
      { name: 'Ad-free experience', included: true },
      { name: 'Code review by experts', included: true }
    ],
    popular: false,
    stripePriceId: 'price_premium_monthly',
    razorpayPlanId: 'plan_premium_monthly'
  },
  {
    id: 'premium-yearly',
    name: 'Premium Yearly',
    description: 'Best value! Get all premium features with yearly billing and save 40%',
    price: 1999,
    originalPrice: 5988,
    period: 'year',
    discount: 40,
    features: [
      { name: 'Everything in Monthly plan', included: true },
      { name: 'Save 40% with yearly billing', included: true },
      { name: 'Exclusive advanced projects', included: true },
      { name: '1-on-1 mentor sessions (2/month)', included: true },
      { name: 'Early access to new features', included: true },
      { name: 'Custom learning path creation', included: true },
      { name: 'Industry certification prep', included: true },
      { name: 'Advanced debugging tools', included: true },
      { name: 'Priority feature requests', included: true },
      { name: 'LinkedIn skill verification', included: true }
    ],
    popular: true,
    stripePriceId: 'price_premium_yearly',
    razorpayPlanId: 'plan_premium_yearly'
  },
  {
    id: 'pro-monthly',
    name: 'Pro Monthly',
    description: 'For serious developers who want advanced features',
    price: 499,
    originalPrice: 799,
    period: 'month',
    features: [
      { name: 'Everything in Premium', included: true },
      { name: 'Advanced algorithm challenges', included: true },
      { name: 'System design courses', included: true },
      { name: 'Interview preparation kit', included: true },
      { name: 'Code performance optimization', included: true },
      { name: 'Team collaboration features', included: true },
      { name: 'API integration projects', included: true },
      { name: 'Database design courses', included: true },
      { name: 'Unlimited mentor sessions', included: true },
      { name: 'Custom portfolio builder', included: true }
    ],
    popular: false,
    stripePriceId: 'price_pro_monthly',
    razorpayPlanId: 'plan_pro_monthly'
  }
];
