import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { Resource } from 'sst';
import ws from 'ws';

// biome-ignore lint/performance/noNamespaceImport: <>
import * as authSchema from '../auth/auth.sql';

neonConfig.webSocketConstructor = ws;
neonConfig.poolQueryViaFetch = true;

const sql = neon(Resource.Neon.urlPooler);

const schema = {
  ...authSchema,
};

export const db = drizzle(sql, { schema });
