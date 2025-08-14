import { defineConfig } from 'drizzle-kit';
import { Resource } from 'sst';

export default defineConfig({
  strict: true,
  verbose: true,
  dialect: 'postgresql',
  schema: ['./src/**/*.sql.ts'],
  out: './migrations',
  dbCredentials: {
    url: Resource.Neon.url,
  },
});
