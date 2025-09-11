// biome-ignore-all lint: SST is globally available

import { domainApi } from './router';

export const native = new sst.x.DevCommand('Native', {
  environment: {
    EXPO_PUBLIC_SERVER_URL: `https://${domainApi}/`,
  },
  dev: {
    directory: 'apps/native',
    command: 'pnpm dev',
    // command: 'pnpmdev:prod',
  },
});
