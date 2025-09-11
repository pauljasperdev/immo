import { expo } from '@better-auth/expo';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
// import { emailOTP } from 'better-auth/plugins';
import { Resource } from 'sst';
import { db } from '../drizzle';
// biome-ignore lint/performance/noNamespaceImport: <drizzle schema docs>
import * as schema from './auth.sql';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  trustedOrigins: ['immo-app://', 'https://appleid.apple.com', 'exp://'],
  secret: Resource.BetterAuthSecret.value,
  emailAndPassword: {
    enabled: true,
  },
  plugins: [expo()],
  socialProviders: {
    // google: {
    //   clientId: Resource.GoogleClientId.value,
    //   clientSecret: Resource.GoogleClientSecret.value,
    // },
    apple: {
      clientId: Resource.AppleClientId.value as string,
      clientSecret: Resource.AppleClientSecret.value as string,
      appBundleIdentifier: Resource.AppleAppBundleIdentifier.value as string,
    },
  },
  telemetry: { enabled: false },
});
