
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
      resize: 'ionic'
    },
    StatusBar: {
      style: 'dark'
    },
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '951939133229-etgc0s5sr5ssl9g4d3goikcn97ontdkc.apps.googleusercontent.com',
      forceCodeForRefreshToken: true
    }
  },
  android: {
    allowMixedContent: true
  },
  ios: {
  }
};

export default config;
