// biome-ignore-all lint: SST is globally available

export const secrets = {
  DatabaseUrl: new sst.Secret('DatabaseUrl'),
  DatabaseUrlPooler: new sst.Secret('DatabaseUrlPooler'),
  BetterAuthSecret: new sst.Secret('BetterAuthSecret'),
  CertArn: new sst.Secret('CertArn'),
};

export const allSecrets = Object.values(secrets);
