// biome-ignore-all lint: SST is globally available
import { neon } from './neon';
import { secrets } from './secrets';

export const api = new sst.aws.Function('Api', {
  link: [neon],
  url: true,
  handler: 'apps/server/src/index.handler',
  environment: {
    BETTER_AUTH_SECRET: secrets.BetterAuthSecret.value,
    GOOGLE_GENERATIVE_AI_API_KEY: secrets.GoogleGenAiApiKey.value,
  },
});
