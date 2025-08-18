// biome-ignore-all lint: SST is globally available
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'immo',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      protect: ['production'].includes(input?.stage),
      home: 'aws',
      providers: {
        aws: {
          region: 'eu-central-1',
          profile:
            {
              production: 'fern-prod',
              dev: 'fern-dev',
            }[input?.stage] ?? 'fern-dev',
        },
      },
    };
  },
  async run() {
    await import('./infra/neon');
    await import('./infra/api');
    await import('./infra/native');

    return {};
  },
  console: {
    autodeploy: {
      target(event) {
        if (
          event.type === 'branch' &&
          event.branch === 'main' &&
          event.action === 'pushed'
        ) {
          return { stage: 'production' };
        }
        if (event.type === 'branch' && event.action === 'pushed') {
          return {
            stage: event.branch
              .replace(/[^a-zA-Z0-9-]/g, '-')
              .replace(/-+/g, '-')
              .replace(/^-/g, '')
              .replace(/-$/g, ''),
          };
        }

        if (event.type === 'pull_request') {
          return { stage: `pr-${event.number}` };
        }
      },
      async workflow({ $, event }) {
        await $`npm i -g pnpm`;
        await $`npm i -g eas-cli`;
        await $`pnpm install -w`;

        // EXPO_TOKEN set in sst console varaibles. no login needed.

        if (event.action === 'removed') {
          await $`pnpm sst remove`;
        } else {
          // Deploy SST infrastructure first
          await $`pnpm sst deploy`;

          // Get the API URL after deployment
          const apiUrl = await $`pnpm env:apiUrl`.text();
          const cleanApiUrl = apiUrl.trim();

          // Update EAS environment variable with the new URL
          await $`eas env:create --profile $SST_STAGE EXPO_PUBLIC_SERVER_URL="${cleanApiUrl}"`;

          await $`eas build --profile $SST_STAGE --platform ios--non-interactive --no-wait`;

          console.log(`EAS build triggered successfully for stage: $SST_STAGE`);
          console.log(`API URL set to: ${cleanApiUrl}`);
        }
      },
    },
  },
});
