
import { useEffect, useState, useRef } from 'react';
import { useRewards } from '@/context/RewardsContext';

interface RewardSimulationCallbacks {
  onXPGain?: (amount: number) => void;
  onCoinGain?: (amount: number) => void;
  onHintGain?: (amount: number) => void;
  onStreakUpdate?: (streak: number) => void;
  onBadgeEarned?: (badge: string) => void;
}

export const useRewardSimulation = (callbacks: RewardSimulationCallbacks) => {
  const { rewards, addXP, addCoins, addHints, updateStreak, addBadge } = useRewards();
  const [showRewardAnimation, setShowRewardAnimation] = useState(false);
  const [rewardType, setRewardType] = useState<'xp' | 'coin' | 'hint' | 'streak' | 'badge' | null>(null);
  const [rewardAmount, setRewardAmount] = useState(0);
  const [badgeName, setBadgeName] = useState('');

  // Store callbacks in a ref so we don't recreate intervals when they change
  const callbacksRef = useRef(callbacks);
  useEffect(() => {
    callbacksRef.current = callbacks;
  }, [callbacks]);

  // Read loginStreak from a ref to avoid recreating intervals on streak updates
  const loginStreakRef = useRef(rewards.loginStreak);
  useEffect(() => {
    loginStreakRef.current = rewards.loginStreak;
  }, [rewards.loginStreak]);

  const showReward = (type: 'xp' | 'coin' | 'hint' | 'streak' | 'badge', amount: number) => {
    setRewardType(type);
    setRewardAmount(amount);
    setShowRewardAnimation(true);
    setTimeout(() => {
      setShowRewardAnimation(false);
    }, 2000);
  };

  useEffect(() => {
    // Simulate gaining XP
    const gainXP = () => {
      const xpAmount = Math.floor(Math.random() * 50) + 50;
      addXP(xpAmount);
      callbacksRef.current.onXPGain?.(xpAmount);
      showReward('xp', xpAmount);
    };

    // Simulate gaining coins
    const gainCoins = () => {
      const coinAmount = Math.floor(Math.random() * 30) + 20;
      addCoins(coinAmount);
      callbacksRef.current.onCoinGain?.(coinAmount);
      showReward('coin', coinAmount);
    };

    // Simulate gaining hints
    const gainHints = () => {
      const hintAmount = Math.floor(Math.random() * 5) + 1;
      addHints(hintAmount);
      callbacksRef.current.onHintGain?.(hintAmount);
      showReward('hint', hintAmount);
    };

    // Simulate updating streak
    const updateCurrentStreak = () => {
      const newStreak = loginStreakRef.current + 1;
      updateStreak();
      callbacksRef.current.onStreakUpdate?.(newStreak);
      showReward('streak', newStreak);
    };

    // Simulate earning a badge
    const earnBadge = () => {
      const badges = ['Beginner', 'Intermediate', 'Advanced'];
      const randomBadge = badges[Math.floor(Math.random() * badges.length)];
      addBadge(randomBadge);
      callbacksRef.current.onBadgeEarned?.(randomBadge);
      showReward('badge', 1);
      setBadgeName(randomBadge);
    };

    // Simulate reward events every few seconds
    const xpInterval = setInterval(gainXP, 8000);
    const coinInterval = setInterval(gainCoins, 12000);
    const hintInterval = setInterval(gainHints, 15000);
    const streakInterval = setInterval(updateCurrentStreak, 20000);
    const badgeInterval = setInterval(earnBadge, 25000);

    return () => {
      clearInterval(xpInterval);
      clearInterval(coinInterval);
      clearInterval(hintInterval);
      clearInterval(streakInterval);
      clearInterval(badgeInterval);
    };
  }, [addBadge, addCoins, addHints, updateStreak, addXP]);

  return {
    showRewardAnimation,
    rewardType,
    rewardAmount,
    badgeName
  };
};

