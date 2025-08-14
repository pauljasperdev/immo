// biome-ignore-all lint: SST is globally available
export const api = new sst.aws.Function('Hono', {
  url: true,
  handler: 'src/index.handler',
});
