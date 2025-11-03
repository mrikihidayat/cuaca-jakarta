import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'cuacajakarta',
  webDir: 'dist',

  // server: {
  //   url: 'http://192.168.1.2:8100', 
  //   cleartext: true, 
  // },
  
  assets: {
    icon: {
      sources: [
        { 
          src: 'resources/icon.png', 
          platform: 'android' 
        } 
      ]
    }
  }
};

export default config;