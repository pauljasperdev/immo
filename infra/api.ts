// biome-ignore-all lint: SST is globally available
import { neon } from './neon';
import { domainApi, routerApi } from './router';
import { secrets } from './secrets';

export const api = new sst.aws.Function('Api', {
  link: [
    neon,
    secrets.BetterAuthSecret,
    secrets.AppleClientId,
    secrets.AppleClientSecret,
    secrets.AppleAppBundleIdentifier,
    secrets.GoogleGenAiApiKey,
  ],
  url: {
    router: { instance: routerApi, domain: domainApi },
  },
  handler: 'apps/server/src/index.handler',
  environment: {
    GOOGLE_GENERATIVE_AI_API_KEY: secrets.GoogleGenAiApiKey.value,
  },
});

// router.route('/api/v1', api.url, {
//   rewrite: {
//     regex: '^/api/v1/(.*)$',
//     to: '/$1',
//   },
// });

// export const apiUrl = `https://${domain}/api/v1/`;
