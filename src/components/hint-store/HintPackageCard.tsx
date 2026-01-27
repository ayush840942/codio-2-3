
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Zap } from 'lucide-react';
import { HintPackage } from '@/data/hintPackages';

interface HintPackageCardProps {
  pkg: HintPackage;
  loading: string | null;
  onPurchase: (pkg: HintPackage) => void;
}

const HintPackageCard: React.FC<HintPackageCardProps> = ({ pkg, loading, onPurchase }) => {
  const handlePurchase = () => {
    onPurchase(pkg);
  };

  return (
    <Card className={`relative transition-all duration-200 hover:shadow-md border ${
      pkg.popular ? 'border-blue-200 bg-blue-50/50' : 'border-gray-200 bg-white'
    }`}>
      {pkg.popular && (
        <div className="absolute -top-2 left-4">
          <Badge className="bg-blue-500 text-white text-xs px-2 py-1">
            Most Popular
          </Badge>
        </div>
      )}
      
      {pkg.discount && (
        <div className="absolute -top-2 right-4">
          <Badge className="bg-green-500 text-white text-xs px-2 py-1">
            {pkg.discount}% OFF
          </Badge>
        </div>
      )}

      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              pkg.popular ? 'bg-blue-100' : 'bg-gray-100'
            }`}>
              <Sparkles className={`h-4 w-4 ${
                pkg.popular ? 'text-blue-600' : 'text-gray-600'
              }`} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{pkg.name}</h3>
              <p className="text-sm text-gray-600">{pkg.description}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-gray-900">₹{pkg.price}</div>
            <div className="text-xs text-gray-500">{pkg.hintAmount} hints</div>
          </div>
        </div>

        <Button
          onClick={handlePurchase}
          disabled={loading === pkg.id}
          className={`w-full font-medium transition-all ${
            pkg.popular 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-gray-900 hover:bg-gray-800 text-white'
          }`}
        >
          {loading === pkg.id ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Processing...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Zap className="h-4 w-4" />
              Purchase
            </div>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default HintPackageCard;
