import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'SVSYS-DEF',
  webDir: 'www',
  android: {
    path: "android",
    // Nivel mínimo de SDK compatible
    minWebViewVersion: 60, // Mínimo recomendado para Android 8.1+
    buildOptions: {
      keystorePath: "./keystore.jks",
      keystorePassword: "password",
      keystoreAlias: "alias",
      keystoreAliasPassword: "aliasPassword",
      releaseType: "AAB",
    },
  },
};

export default config;
