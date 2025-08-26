import { expoClient } from '@better-auth/expo/client';
import { createAuthClient } from 'better-auth/react';
// biome-ignore lint/performance/noNamespaceImport: <generated code>
import * as SecureStore from 'expo-secure-store';

const TRAILING_SLASH_REGEX = /\/$/;

export const authClient = createAuthClient({
  baseURL: `${process.env.EXPO_PUBLIC_SERVER_URL?.replace(
    TRAILING_SLASH_REGEX,
    ''
  )}/api/auth`,
  plugins: [
    expoClient({
      storagePrefix: 'immo-app',
      storage: SecureStore,
      scheme: 'immo-app',
    }),
  ],
});
