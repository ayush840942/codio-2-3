
import React from 'react';
import { CheckCircle, Crown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plan } from '@/types/subscription';

interface SubscriptionPlanCardProps {
  plan: Plan;
  loading: string | null;
  onSubscribe: (plan: Plan) => void;
}

const SubscriptionPlanCard: React.FC<SubscriptionPlanCardProps> = ({
  plan,
  loading,
  onSubscribe,
}) => {
  const handleSubscribe = () => {
    if (plan.id === 'free') {
      return;
    }
    console.log('Subscribe button clicked for plan:', plan.id);
    onSubscribe(plan);
  };

  const isYearly = plan.period === 'year';
  const isPro = plan.id.includes('pro');
  const isPremium = plan.id.includes('premium');
  const isLoading = loading === plan.id;

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const isIndia = timezone === 'Asia/Kolkata' || timezone.startsWith('Asia/Calcutta');
  const currencySymbol = isIndia ? '₹' : '$';

  const getDisplayPrice = (inrPrice: number) => {
    if (inrPrice === 0) return 'Free';
    if (isIndia) return `₹${inrPrice}`;

    const usdPriceMap: Record<number, number> = {
      299: 4.99,
      1999: 24.99,
      499: 9.99
    };
    return `$${usdPriceMap[inrPrice] || (Math.round(inrPrice / 80 * 100) / 100)}`;
  };

  const getSavingsText = (original: number, current: number) => {
    if (isIndia) return `Save ₹${original - current}`;
    const getUsdAmount = (inr: number) => {
      const map: Record<number, number> = { 299: 4.99, 1999: 24.99, 499: 9.99, 2388: 29.99 };
      return map[inr] || (Math.round(inr / 80 * 100) / 100);
    };
    const saved = getUsdAmount(original) - getUsdAmount(current);
    return `Save $${saved.toFixed(2)}`;
  };

  return (
    <Card
      className={`relative h-full transition-all duration-300 hover:shadow-lg w-full max-w-full ${plan.popular
        ? 'border-2 border-blue-500 shadow-lg scale-105'
        : 'border border-gray-200 hover:border-gray-300'
        } ${plan.id === 'free' ? 'bg-gray-50' : 'bg-white'}`}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
          <Badge className="bg-blue-500 text-white px-4 py-1 text-sm font-medium">
            Most Popular
          </Badge>
        </div>
      )}

      {plan.discount && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-green-500 text-white px-2 py-1 text-xs">
            Save {plan.discount}%
          </Badge>
        </div>
      )}

      <CardHeader className={`text-center px-4 sm:px-6 ${plan.popular ? 'pt-8' : 'pt-6'}`}>
        <CardTitle className="text-lg sm:text-xl font-bold flex items-center justify-center gap-2 text-gray-900">
          {isPro && <Crown className="h-5 w-5 text-blue-600" />}
          {isPremium && <Zap className="h-5 w-5 text-purple-600" />}
          <span className="text-center">{plan.name}</span>
        </CardTitle>

        <div className="mt-4">
          <div className="flex items-baseline justify-center">
            <span className="text-2xl sm:text-3xl font-bold text-gray-900">
              {getDisplayPrice(plan.price)}
            </span>
            {plan.price > 0 && (
              <span className="text-gray-500 ml-2 text-sm">
                /{isYearly ? 'year' : plan.period}
              </span>
            )}
          </div>

          {plan.originalPrice && plan.discount && (
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="text-sm text-gray-400 line-through">
                {getDisplayPrice(plan.originalPrice)}
              </span>
              <span className="text-sm font-medium text-green-600">
                {getSavingsText(plan.originalPrice, plan.price)}
              </span>
            </div>
          )}

          {isYearly && (
            <p className="text-sm text-gray-500 mt-2">
              ≈ {isIndia ? `₹${Math.round(plan.price / 12)}` : `$${(Math.round(plan.price / 12 / 80 * 100) / 100).toFixed(2)}`}/month
            </p>
          )}
        </div>

        <p className="text-sm text-gray-600 mt-3 px-2">
          {plan.description}
        </p>
      </CardHeader>

      <CardContent className="flex-grow px-4 sm:px-6">
        <ul className="space-y-2 sm:space-y-3">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2 sm:gap-3">
              <CheckCircle className={`h-4 w-4 mt-0.5 flex-shrink-0 ${feature.included ? 'text-green-500' : 'text-gray-300'
                }`} />
              <span className={`text-xs sm:text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400 line-through'
                }`}>
                {feature.name}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="pt-4 px-4 sm:px-6">
        <Button
          onClick={handleSubscribe}
          disabled={isLoading || plan.id === 'free'}
          className={`w-full font-medium transition-all text-sm sm:text-base ${plan.popular
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : plan.id === 'free'
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed hover:bg-gray-200'
              : 'bg-gray-900 hover:bg-gray-800 text-white'
            }`}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Processing...</span>
            </div>
          ) : plan.id === 'free' ? (
            'Current Plan'
          ) : (
            `Get ${plan.name}`
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionPlanCard;
