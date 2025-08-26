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
    const { router, routerApi } = await import('./infra/router');
    await import('./infra/neon');
    const { api } = await import('./infra/api');
    await import('./infra/native');

    await import('./infra/transcribe');

    return {
      Router_ID: router.distributionID,
      API_Router_ID: routerApi.distributionID,
    };
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
        const stage = await $`echo $SST_STAGE`.text();
        await $`npm install -g eas-cli`;
        await $`bun install`;

        // EXPO_TOKEN set in sst console varaibles. no login needed.

        if (event.action === 'removed') {
          await $`bun sst remove`;
        } else {
          // Deploy SST infrastructure first
          await $`bun sst deploy`;
          await $`bun db:migrate`;

          // Get the API URL after deployment
          const apiUrl = await $`bun env:apiUrl`.text();
          const cleanApiUrl = apiUrl.trim();

          const easProfile = { dev: 'preview', production: 'production' }[
            stage
          ];
          if (easProfile) {
            await $`cd apps/native && eas init --non-interactive`;
            // Update EAS environment variable with the new URL
            await $`cd apps/native && eas env:create ${easProfile} --name EXPO_PUBLIC_SERVER_URL --value "${cleanApiUrl}" --visibility plaintext --non-interactive --force`;
            await $`cd apps/native && eas build --profile ${easProfile} --platform ios --non-interactive --no-wait`;
          }

          console.log(
            `EAS build triggered successfully for stage: $SST_STAGE\nAPI URL set to: ${cleanApiUrl}`
          );
        }
      },
    },
  },
});
