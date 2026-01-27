
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Register PWA service worker
registerSW({ immediate: true });

// Capacitor imports for mobile
import { Capacitor } from '@capacitor/core';

// Mobile viewport configuration
const configureMobileViewport = () => {
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    viewport.setAttribute('content',
      'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
    );
  } else {
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
    document.head.appendChild(meta);
  }

  // Add mobile-specific meta tags
  const mobileMetaTags = [
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    { name: 'apple-mobile-web-app-title', content: 'CodeZen' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'theme-color', content: '#3B82F6' },
    { name: 'msapplication-navbutton-color', content: '#3B82F6' }
  ];

  mobileMetaTags.forEach(tag => {
    if (!document.querySelector(`meta[name="${tag.name}"]`)) {
      const meta = document.createElement('meta');
      meta.name = tag.name;
      meta.content = tag.content;
      document.head.appendChild(meta);
    }
  });
};

// Enhanced mobile performance optimization
const optimizeMobilePerformance = () => {
  // Remove any existing touch delay
  document.documentElement.style.touchAction = 'manipulation';

  // Enhanced touch handling
  const handleTouchStart = () => { };
  const handleTouchMove = () => { };

  document.addEventListener('touchstart', handleTouchStart, { passive: true });
  document.addEventListener('touchmove', handleTouchMove, { passive: true });

  // Prevent zoom on double tap
  let lastTouchEnd = 0;
  document.addEventListener('touchend', (event) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, { passive: false });

  // Optimize scrolling performance
  const style = document.createElement('style');
  style.textContent = `
    * {
      -webkit-tap-highlight-color: transparent;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    
    input, textarea, [contenteditable] {
      -webkit-user-select: text;
      -khtml-user-select: text;
      -moz-user-select: text;
      -ms-user-select: text;
      user-select: text;
    }
    
    body, html {
      overscroll-behavior: contain;
      -webkit-overflow-scrolling: touch;
      scroll-behavior: smooth;
    }
    
    .scrollable {
      -webkit-overflow-scrolling: touch;
      overscroll-behavior: contain;
      transform: translateZ(0);
    }
  `;
  document.head.appendChild(style);
};

// Initialize mobile-specific features
const initializeMobile = async () => {
  if (Capacitor.isNativePlatform()) {
    console.log('Running on mobile platform:', Capacitor.getPlatform());
  }

  configureMobileViewport();
  optimizeMobilePerformance();
};

// Initialize app
const initApp = async () => {
  try {
    await initializeMobile();

    if (document.readyState === 'loading') {
      await new Promise(resolve => {
        document.addEventListener('DOMContentLoaded', resolve);
      });
    }

    const rootElement = document.getElementById("root");
    if (!rootElement) {
      throw new Error('Root element not found');
    }

    const root = createRoot(rootElement);
    root.render(<App />);
  } catch (error) {
    console.error('Failed to initialize app:', error);
    const rootElement = document.getElementById("root");
    if (rootElement) {
      const root = createRoot(rootElement);
      root.render(<App />);
    }
  }
};

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
