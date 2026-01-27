
import { useEffect, useCallback, useState } from 'react';
import { AdMob, InterstitialAdPluginEvents, AdMobError, AdLoadInfo } from '@capacitor-community/admob';

export const useInterstitialAd = () => {
  // IMPORTANT: Using your real AdMob Interstitial Ad Unit ID.
  const adUnitId = 'ca-app-pub-7599329187050345/4646578553';
  const [isAdReady, setIsAdReady] = useState(false);

  const prepareAd = useCallback(async () => {
    try {
      await AdMob.prepareInterstitial({
        adId: adUnitId,
      });
      console.log('Interstitial ad prepared successfully');
    } catch (error) {
      console.error('Error preparing interstitial ad:', error);
      setIsAdReady(false);
    }
  }, [adUnitId]);

  useEffect(() => {
    // Initialize AdMob and set up listeners
    const initializeAdMob = async () => {
      try {
        await AdMob.initialize({
          testingDevices: ['YOUR_TESTING_DEVICE_ID'], // Add your testing device ID here
          initializeForTesting: false, // Set to true for testing
        });
        console.log('AdMob initialized successfully');
        prepareAd();
      } catch (error) {
        console.error('Error initializing AdMob:', error);
      }
    };

    // Add event listeners
    const handleAdLoaded = (info: AdLoadInfo) => {
      console.log('Interstitial ad loaded:', info);
      setIsAdReady(true);
    };

    const handleAdFailedToLoad = (error: AdMobError) => {
      console.error('Interstitial ad failed to load:', error);
      setIsAdReady(false);
      // Retry preparing after a delay
      setTimeout(prepareAd, 5000);
    };

    const handleAdDismissed = () => {
      console.log('Interstitial ad dismissed');
      setIsAdReady(false);
      prepareAd(); // Prepare the next one
    };

    const handleAdFailedToShow = (error: AdMobError) => {
      console.error('Interstitial ad failed to show:', error);
      setIsAdReady(false);
    };

    // Initialize and register listeners
    const setupListeners = async () => {
      await initializeAdMob();
      
      // Register listeners and await the handles
      const loadedListener = await AdMob.addListener(InterstitialAdPluginEvents.Loaded, handleAdLoaded);
      const failedToLoadListener = await AdMob.addListener(InterstitialAdPluginEvents.FailedToLoad, handleAdFailedToLoad);
      const dismissedListener = await AdMob.addListener(InterstitialAdPluginEvents.Dismissed, handleAdDismissed);
      const failedToShowListener = await AdMob.addListener(InterstitialAdPluginEvents.FailedToShow, handleAdFailedToShow);

      return () => {
        // Clean up listeners properly
        loadedListener.remove();
        failedToLoadListener.remove();
        dismissedListener.remove();
        failedToShowListener.remove();
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
  }, [prepareAd]);

  const showInterstitial = useCallback(async () => {
    if (isAdReady) {
      try {
        await AdMob.showInterstitial();
      } catch (error) {
        console.error('Error showing interstitial ad:', error);
      }
    } else {
      console.log("Interstitial ad not ready yet, will not show.");
    }
  }, [isAdReady]);

  return { showInterstitial, isAdReady };
};
