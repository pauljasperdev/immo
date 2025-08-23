import { expo } from '@better-auth/expo';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { Resource } from 'sst';
import { db } from '../drizzle';
// biome-ignore lint/performance/noNamespaceImport: <drizzle schema docs>
import * as schema from './auth.sql';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  trustedOrigins: [process.env.CORS_ORIGIN || '', 'immo-app://'],
  secret: Resource.BetterAuthSecret.value,
  plugins: [expo()],
  socialProviders: {
    google: {
      clientId: Resource.GoogleClientId.value,
      clientSecret: Resource.GoogleClientSecret.value,
    },
    apple: {
      clientId: Resource.AppleClientId.value,
      clientSecret: Resource.AppleClientSecret.value,
    },
  },
});
