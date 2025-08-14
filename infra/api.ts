// biome-ignore-all lint: SST is globally available
import { neon } from './neon';

export const api = new sst.aws.Function('Api', {
  link: [neon],
  url: true,
  handler: 'apps/server/src/index.handler',
});
