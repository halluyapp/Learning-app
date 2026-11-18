import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.lingolume.app',
  appName: 'LingoLume',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
}

export default config
