
export interface ReferralData {
  id: string;
  referrerUserId: string;
  referredUserId: string;
  referralCode: string;
  status: 'pending' | 'completed' | 'rewarded';
  createdAt: string;
  completedAt?: string;
  rewardsClaimed: boolean;
  bonusXp: number;
  bonusCoins: number;
}

export interface ReferralStats {
  totalReferrals: number;
  completedReferrals: number;
  pendingReferrals: number;
  totalRewardsEarned: {
    xp: number;
    coins: number;
  };
  referralCode: string;
}

export interface ReferralReward {
  referrerReward: {
    xp: number;
    coins: number;
    hintPoints: number;
  };
  referredReward: {
    xp: number;
    coins: number;
    hintPoints: number;
  };
}
