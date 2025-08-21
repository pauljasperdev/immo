// biome-ignore-all lint: SST is globally available

import { api } from './api';

const apiUrl = api.url.apply((url) => (url.endsWith('/') ? url : `${url}/`));

export const native = new sst.x.DevCommand('Native', {
  environment: {
    EXPO_PUBLIC_SERVER_URL: apiUrl,
  },
  dev: {
    directory: 'apps/native',
    command: 'bun dev',
  },
});
