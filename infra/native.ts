// biome-ignore-all lint: SST is globally available

import { api } from './api';
import { domainApi } from './router';

// running native app trough sst multiplexer prevents watchman
// from seeing file changes thus breaking hot reloading.
// We need to write the server url to the .env file manually.
// native app should be run outside of sst multiplexer in seperate shell.

// Dev command to write .env file for Expo
export const nativeEnv = new sst.x.DevCommand('NativeEnv', {
  dev: {
    command: 'pnpm --filter scripts env:setServerUrl',
  },
  link: [api],
});

// const serverUrl = `https://${domainApi}/`;
// export const native = new sst.x.DevCommand('Native', {
//   environment: {
//     EXPO_PUBLIC_SERVER_URL: serverUrl,
//   },
//   dev: {
//     directory: 'apps/native',
//     command: 'pnpm dev',
//     // command: 'pnpm dev:prod',
//   },
// });
