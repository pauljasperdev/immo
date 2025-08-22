// biome-ignore-all lint: SST is globally available

import { api, apiUrl } from './api';

export const native = new sst.x.DevCommand('Native', {
  environment: {
    EXPO_PUBLIC_SERVER_URL: apiUrl,
  },
  dev: {
    directory: 'apps/native',
    command: 'bun dev',
  },
});
