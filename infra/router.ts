// biome-ignore-all lint: SST is globally available

import { secrets } from './secrets';

export const domainName =
  $app.stage === 'production' ? '' : `${$app.stage}.immo.pauljasper.dev`;

export const domainAliases =
  $app.stage === 'production' ? [] : [`*.${$app.stage}.immo.pauljasper.dev`];

export const router = new sst.aws.Router('Router', {
  domain: {
    name: domainName,
    aliases: domainAliases,
    dns: false,
    cert: secrets.CertArn.value,
  },
});
