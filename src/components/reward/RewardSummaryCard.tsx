import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Flame, Star, Lightbulb, Zap } from 'lucide-react';
import { Rewards } from '@/types/rewards';
interface RewardSummaryCardProps {
  rewards: Rewards;
}
const RewardSummaryCard: React.FC<RewardSummaryCardProps> = ({
  rewards
}) => {
  return <Card className="bg-white/95 backdrop-blur-sm border-2 border-green-200/50 shadow-lg">
      
    </Card>;
};
export default RewardSummaryCard;