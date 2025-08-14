// biome-ignore-all lint: SST is globally available

import { api } from './api';

export const native = new sst.x.DevCommand('Native', {
  environment: {
    EXPO_PUBLIC_SERVER_URL: api.url,
  },
  dev: {
    directory: 'apps/native',
    command: 'pnpm dev',
  },
});
