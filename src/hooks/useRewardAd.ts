
import { useEffect, useCallback, useState } from 'react';
import { useRewards } from '@/context/RewardsContext';
import { toast } from 'sonner';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { AdMob, RewardAdPluginEvents, AdMobError, AdLoadInfo, AdMobRewardItem } from '@capacitor-community/admob';

const REWARD_AMOUNT = 10; // The number of hints awarded

export const useRewardAd = () => {
  const { addHints } = useRewards();
  const { playSuccess } = useSoundEffects();
  const [isAdReady, setIsAdReady] = useState(false);
  const [isAdShowing, setIsAdShowing] = useState(false);

  // IMPORTANT: Using your real AdMob Rewarded Ad Unit ID
  const adUnitId = 'ca-app-pub-7599329187050345/1571459701';

  const prepareAd = useCallback(async () => {
    try {
      await AdMob.prepareRewardVideoAd({
        adId: adUnitId,
      });
      console.log('Reward ad prepared successfully');
    } catch (error) {
      console.error('Error preparing reward ad:', error);
      setIsAdReady(false);
    }
  }, [adUnitId]);

  useEffect(() => {
    // Initialize and prepare first ad
    const initializeRewardAd = async () => {
      try {
        await AdMob.initialize({
          testingDevices: ['YOUR_TESTING_DEVICE_ID'], // Add your testing device ID here
          initializeForTesting: false, // Set to true for testing
        });
        console.log('AdMob initialized for reward ads');
        prepareAd();
      } catch (error) {
        console.error('Error initializing AdMob for reward ads:', error);
      }
    };

    const handleRewardAdLoaded = (info: AdLoadInfo) => {
      console.log('Reward ad loaded:', info);
      setIsAdReady(true);
    };

    const handleRewardAdFailedToLoad = (error: AdMobError) => {
      console.error('Reward ad failed to load:', error);
      setIsAdReady(false);
      setTimeout(prepareAd, 5000); // Retry preparing ad after 5s
    };

    const handleRewardAdShowed = () => {
      console.log('Reward ad showed');
      setIsAdShowing(true);
    };

    const handleRewardAdDismissed = () => {
      console.log('Reward ad dismissed');
      setIsAdReady(false);
      setIsAdShowing(false);
      prepareAd(); // Prepare next ad
    };

    const handleRewardAdFailedToShow = (error: AdMobError) => {
      console.error('Reward ad failed to show:', error);
      setIsAdReady(false);
      setIsAdShowing(false);
      prepareAd(); // Prepare next ad
    };

    const handleRewardAdRewarded = (reward: AdMobRewardItem) => {
      console.log('User rewarded:', reward);
      addHints(REWARD_AMOUNT);
      playSuccess();
      toast.success(`🎉 You've earned ${REWARD_AMOUNT} hints!`);
    };

    // Initialize and register listeners
    const setupListeners = async () => {
      await initializeRewardAd();
      
      // Register listeners with proper cleanup and await the handles
      const loadedListener = await AdMob.addListener(RewardAdPluginEvents.Loaded, handleRewardAdLoaded);
      const failedToLoadListener = await AdMob.addListener(RewardAdPluginEvents.FailedToLoad, handleRewardAdFailedToLoad);
      const showedListener = await AdMob.addListener(RewardAdPluginEvents.Showed, handleRewardAdShowed);
      const dismissedListener = await AdMob.addListener(RewardAdPluginEvents.Dismissed, handleRewardAdDismissed);
      const failedToShowListener = await AdMob.addListener(RewardAdPluginEvents.FailedToShow, handleRewardAdFailedToShow);
      const rewardedListener = await AdMob.addListener(RewardAdPluginEvents.Rewarded, handleRewardAdRewarded);

      return () => {
        // Clean up listeners properly
        loadedListener.remove();
        failedToLoadListener.remove();
        showedListener.remove();
        dismissedListener.remove();
        failedToShowListener.remove();
        rewardedListener.remove();
      };
    };

    let cleanup: (() => void) | null = null;
    
    setupListeners().then((cleanupFn) => {
      cleanup = cleanupFn;
    }).catch((error) => {
      console.error('Error setting up AdMob listeners:', error);
    });

    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, [addHints, prepareAd, playSuccess]);

  const showRewardAd = useCallback(async () => {
    if (isAdShowing) {
      return;
    }
    
    if (isAdReady) {
      try {
        await AdMob.showRewardVideoAd();
      } catch (error) {
        console.error('Error showing reward ad:', error);
      }
    } else {
      prepareAd(); // Try to prepare ad again
    }
  }, [isAdReady, isAdShowing, prepareAd]);

  return { showRewardAd, isAdReady };
};
