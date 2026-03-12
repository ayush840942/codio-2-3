
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'web.codezen',
  appName: 'Codio',
  webDir: 'dist',
  /*
  server: {
    url: 'https://d5f1b9ec-c305-468b-bb34-bfdc9b510b2a.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  */
  plugins: {
    AdMob: {
      requestTrackingAuthorization: true,
      testingDevices: ['YOUR_TESTING_DEVICE_ID'],
      initializeForTesting: false
    },
    Keyboard: {
      resize: 'body' as any
    },
    StatusBar: {
      style: 'dark' as any,
    },
    GoogleAuth: {
      scopes: ['profile', 'email'],
      // serverClientId = web/server OAuth client (type 3) — used to get idToken for Firebase
      serverClientId: '951939133229-etgc0s5sr5ssl9g4d3goikcn97ontdkc.apps.googleusercontent.com',
      // androidClientId = Android OAuth client (type 1) registered with SHA-1 4c0e339f... for web.codezen
      androidClientId: '951939133229-v93l8g236k2lb0mvr95ju7b8beg9h898.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
      grantOfflineAccess: true
    },
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: "#FEF9C3", // App's pastel yellow theme
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#000000", // Black for comic theme
      splashFullScreen: true,
      splashImmersive: true
    }
  },
  android: {
    allowMixedContent: true
  },
  ios: {
  }
};

export default config;
