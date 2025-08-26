// biome-ignore-all lint: SST is globally available

export const secrets = {
  DatabaseUrl: new sst.Secret('DatabaseUrl'),
  DatabaseUrlPooler: new sst.Secret('DatabaseUrlPooler'),
  BetterAuthSecret: new sst.Secret('BetterAuthSecret'),
  CertArn: new sst.Secret('CertArn'),
  CertArnApi: new sst.Secret('CertArnApi'),
  GoogleGenAiApiKey: new sst.Secret('GoogleGenAiApiKey'),
  AppleClientId: new sst.Secret('AppleClientId'),
  AppleClientSecret: new sst.Secret('AppleClientSecret'),
  AppleAppBundleIdentifier: new sst.Secret('AppleAppBundleIdentifier'),
};

export const allSecrets = Object.values(secrets);
