import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { Keyboard, KeyboardResize } from '@capacitor/keyboard';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const useAndroidOptimizations = () => {
  
  useEffect(() => {
    const setupAndroidOptimizations = async () => {
      if (Capacitor.isNativePlatform()) {
        try {
          // Status bar configuration
          await StatusBar.setStyle({ style: Style.Dark });
          await StatusBar.setBackgroundColor({ color: '#6366f1' });
          
          // Keyboard configuration
          Keyboard.addListener('keyboardWillShow', () => {
            document.body.classList.add('keyboard-open');
          });
          
          Keyboard.addListener('keyboardWillHide', () => {
            document.body.classList.remove('keyboard-open');
          });
          
          // Prevent keyboard from pushing content up
          await Keyboard.setResizeMode({ mode: KeyboardResize.Ionic });
          
        } catch (error) {
          console.warn('Error setting up Android optimizations:', error);
        }
      }
      
      // PWA optimizations
      if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
        window.addEventListener('beforeinstallprompt', (e) => {
          e.preventDefault();
          // Store the event for later use
          (window as any).deferredPrompt = e;
        });
      }
      
      // Prevent zoom on double tap (Android)
      let lastTouchEnd = 0;
      document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
          event.preventDefault();
        }
        lastTouchEnd = now;
      }, false);
      
      // Smooth scrolling for Android
      document.body.style.overscrollBehavior = 'contain';
      
      // Viewport meta tag fix for mobile
      const viewport = document.querySelector('meta[name=viewport]');
      if (viewport) {
        viewport.setAttribute('content', 
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
        );
      }
    };
    
    setupAndroidOptimizations();
    
    return () => {
      if (Capacitor.isNativePlatform()) {
        Keyboard.removeAllListeners();
      }
    };
  }, []);
  
  const playHapticFeedback = async (style: 'light' | 'medium' | 'heavy' = 'light') => {
    if (Capacitor.isNativePlatform()) {
      try {
        const impactStyle = style === 'light' ? ImpactStyle.Light : 
                          style === 'medium' ? ImpactStyle.Medium : ImpactStyle.Heavy;
        await Haptics.impact({ style: impactStyle });
      } catch (error) {
        console.warn('Haptic feedback not available:', error);
      }
    }
  };
  
  const isAndroid = () => Capacitor.getPlatform() === 'android';
  const isIOS = () => Capacitor.getPlatform() === 'ios';
  const isNative = () => Capacitor.isNativePlatform();
  
  return {
    playHapticFeedback,
    isAndroid,
    isIOS,
    isNative
  };
};