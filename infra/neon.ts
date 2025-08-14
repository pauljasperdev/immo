// biome-ignore-all lint: SST is globally available

import { secrets } from './secrets';

export const neon = new sst.Linkable('Neon', {
  properties: {
    url: secrets.DatabaseUrl.value,
    urlPooler: secrets.DatabaseUrlPooler.value,
  },
});
export const studio = new sst.x.DevCommand('Studio', {
  link: [neon],
  dev: {
    directory: 'packages/core',
    command: 'npx drizzle-kit studio',
  },
});
