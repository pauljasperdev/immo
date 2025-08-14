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
        await $`pnpm i`;
        if (event.action === 'removed') {
          await $`pnpm sst remove`;
        } else {
          // await $`cd packages/core && pnpm db migrate`;
          await $`pnpm sst deploy`;
        }
      },
    },
  },
});
