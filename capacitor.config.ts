import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'licoreraApp',
  appName: 'licoreraApp',
  bundledWebRuntime: false,
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    },
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: [
        "facebook.com",
        "google.com",
      ]
    }
  },
  cordova: {
    preferences: {
      ScrollEnabled: 'false',
      BackupWebStorage: 'none',
      SplashMaintainAspectRatio: 'true',
      FadeSplashScreenDuration: '300',
      SplashShowOnlyFirstTime: 'false',
      SplashScreen: 'screen',
      SplashScreenDelay: '3000'
    }
  }
};

export default config;
