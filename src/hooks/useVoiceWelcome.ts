import { useState, useCallback, useEffect } from 'react';
import { playGamifiedWelcome } from '@/utils/voiceUtils';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const WELCOME_PLAYED_KEY = 'codio_welcome_played_session';

export const useVoiceWelcome = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasPlayedThisSession, setHasPlayedThisSession] = useState(() => {
    // Check sessionStorage on mount
    return sessionStorage.getItem(WELCOME_PLAYED_KEY) === 'true';
  });

  const playWelcomeMessage = useCallback(async (userName: string) => {
    // Don't play if already played this session, currently playing, or loading
    if (hasPlayedThisSession || isPlaying || isLoading) return;

    setIsLoading(true);
    try {
      // Mark as played immediately to prevent double triggers
      sessionStorage.setItem(WELCOME_PLAYED_KEY, 'true');
      setHasPlayedThisSession(true);

      // Game-style welcome message with energy
      const displayName = userName || 'Champion';
      const welcomeTexts = [
        `Hey ${displayName}! Ready to level up? Let's crush some code today!`,
        `Welcome back, ${displayName}! Time to unlock your coding superpowers!`,
        `Yo ${displayName}! The coding arena awaits! Let's gooo!`,
        `${displayName} has entered the game! Time to code like a pro!`,
      ];
      const welcomeText = welcomeTexts[Math.floor(Math.random() * welcomeTexts.length)];

      console.log('Playing welcome message:', welcomeText);

      console.log('Playing welcome message:', welcomeText);

      // Use the new utility that supports ElevenLabs with browser fallback
      await playGamifiedWelcome(welcomeText);

      setIsPlaying(false);
      setIsLoading(false);
      return;

      // ... Fallback to Supabase function if needed (removed for now to prioritize native reliability as requested)

    } catch (error) {
      console.error('Error playing welcome message:', error);
      setIsPlaying(false);
      setIsLoading(false);
    }
  }, [hasPlayedThisSession, isPlaying, isLoading]);

  return { playWelcomeMessage, isPlaying, isLoading, hasPlayedThisSession };
};