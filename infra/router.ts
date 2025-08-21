// biome-ignore-all lint: SST is globally available

import { secrets } from './secrets';

// Define permanent stages that get their own CloudFront distribution
const isPermanentStage = ['production', 'dev'].includes($app.stage);

// Domain configuration based on stage
const domain =
  $app.stage === 'production'
    ? 'mynewdomain.com' // TODO: on domain change, set CNAME records for CF distribution in new registrar
    : $app.stage === 'dev'
      ? 'immo.pauljasper.dev'
      : `${$app.stage}.immo.pauljasper.dev`;

export const domainName = domain;

// Create router only for non-production stages with domains
export const router = isPermanentStage
  ? new sst.aws.Router('Router', {
      domain: {
        name: domain,
        aliases: [`*.${domain}`],
        dns: false,
        cert: secrets.CertArn.value,
      },
    })
  : sst.aws.Router.get('Router', 'EFSOATM4BIF5E');
