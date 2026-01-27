
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart } from 'lucide-react';

interface HintPurchasePromptProps {
  hintPoints: number;
  minCost: number;
  onPurchaseClick: () => void;
}

const HintPurchasePrompt: React.FC<HintPurchasePromptProps> = ({
  hintPoints,
  minCost,
  onPurchaseClick
}) => {
  if (hintPoints >= minCost) return null;

  return (
    <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-lg border border-orange-200">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Star className="h-5 w-5 text-orange-500" />
          <div>
            <p className="font-medium text-orange-800">Need more hints?</p>
            <p className="text-sm text-orange-600">Visit the Hint Store to get more hints</p>
          </div>
        </div>
        <Button
          onClick={onPurchaseClick}
          size="sm"
          className="bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Get Hints
        </Button>
      </div>
    </div>
  );
};

export default HintPurchasePrompt;
