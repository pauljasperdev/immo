# immo

Expo app with hono backend.

## Prerequisites

Make sure aws credentials are set at `~/.aws/credentials` or using `AWS Vault`

```bash
pnpm install
```

## Build iOS Simulator development client

Requires MacOS with `XCode` and `XCode Command Line Tools` installed.

```bash
pnpm run build:dev:local
```

Unzip artifact and drag on iOS Simulator to install.

## Run dev server

```bash
pnpm dev
```

In `sst` Multiplexer choose iOS development server through development client. Do not choose Expo Go as this is buggy for many native features.

## License

Copyright (c) 2025 Paul. All rights reserved.

This project is public for portfolio purposes only. It is not open source.
See [LICENSE](LICENSE) for details.
