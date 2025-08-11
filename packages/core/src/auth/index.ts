import { expo } from '@better-auth/expo';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '../drizzle';
// biome-ignore lint/performance/noNamespaceImport: <drizzle schema docs>
import * as schema from './auth.sql';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',

    schema,
  }),
  trustedOrigins: [process.env.CORS_ORIGIN || '', 'my-better-t-app://'],
  emailAndPassword: {
    enabled: true,
  },
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [expo()],
});
