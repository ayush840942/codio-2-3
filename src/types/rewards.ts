

export interface UserRewards {
  xp: number;
  coins: number;
  hintPoints: number;
  dailyStreak: number;
  loginStreak: number; // Add missing loginStreak
  streak: number; // Add missing streak
  badges: string[];
  lastClaimDate: string | null;
  trialDaysRemaining: number;
  totalXpEarned: number;
  levelsCompleted: number;
  perfectSolutions: number;
  hintPointsSpent: number;
  freeHintDays: number;
  trialStartDate: string | null;
  isTrialActive: boolean;
}

// Export Rewards as an alias for UserRewards for backward compatibility
export type Rewards = UserRewards;

export interface RewardsContextType {
  rewards: UserRewards;
  setRewards: (rewards: UserRewards) => void;
  addXP: (amount: number) => Promise<void>;
  addCoins: (amount: number) => Promise<void>;
  addHints: (amount: number) => Promise<void>;
  useHint: () => Promise<boolean>;
  useHints: (amount: number) => Promise<boolean>;
  updateStreak: () => Promise<void>;
  addBadge: (badge: string) => Promise<void>;
  claimDailyReward: () => Promise<boolean>;
  canClaimDaily: () => boolean;
  loading: boolean;
  checkTrialStatus: () => Promise<void>;
  getTrialDaysRemaining: () => Promise<number>;
  refreshRewards: () => Promise<void>;
}

export interface DailyReward {
  day: number;
  xp: number;
  coins: number;
  hintPoints: number;
  claimed: boolean;
}

