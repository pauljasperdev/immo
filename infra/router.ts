// biome-ignore-all lint: SST is globally available

import { secrets } from './secrets';
import { isPermanentStage } from './utils';

export const baseUrl =
  $app.stage === 'production' ? 'mynewdomain.com' : 'immo.pauljasper.dev';

export const domain = isPermanentStage ? baseUrl : `${$app.stage}.${baseUrl}`;

// eg. stage=paul: paul.api.immo.pauljasper.dev, stage=dev: api.immo.pauljasper.dev
export const domainApi = isPermanentStage
  ? `api.${baseUrl}`
  : `${$app.stage}.api.${baseUrl}`;

export const router = isPermanentStage
  ? new sst.aws.Router('Router', {
      domain: {
        name: domain,
        aliases: [`*.${domain}`],
        dns: false,
        cert: secrets.CertArn.value,
      },
    })
  : sst.aws.Router.get('Router', 'ENPQU7DO4APH7');

export const routerApi = isPermanentStage
  ? new sst.aws.Router('RouterApi', {
      domain: {
        name: domainApi,
        aliases: [`*.${domainApi}`],
        dns: false,
        cert: secrets.CertArnApi.value,
      },
    })
  : sst.aws.Router.get('RouterApi', 'EICZ7J2LTD46H');
