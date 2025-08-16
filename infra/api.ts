// biome-ignore-all lint: SST is globally available
import { neon } from './neon';
import { domainName, router } from './router';
import { secrets } from './secrets';

export const api = new sst.aws.Function('Api', {
  link: [neon],
  url: true,
  // url: {
  //   router: { instance: router, domain: `api.${domainName}` },
  // },
  handler: 'apps/server/src/index.handler',
  environment: {
    BETTER_AUTH_SECRET: secrets.BetterAuthSecret.value,
    GOOGLE_GENERATIVE_AI_API_KEY: secrets.GoogleGenAiApiKey.value,
  },
});
