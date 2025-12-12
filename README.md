# immo

Expo app with hono backend.

## Getting Started

### AWS Credentails

Make sure aws credentials are set at `~/.aws/credentials` or **better use `AWS Vault`**

With `AWS Vault` add the following to use profile and inject credentials to `sst` commands.
Leave `~/.aws/credentials` empty.

```ini
# ~/.aws/config
[profile immo.dev]
region=eu-central-1
credential_process=aws-vault exec MyVaultProfile --json --no-session
```

```bash
pnpm install
```

### Build iOS Simulator development client

Requires MacOS with `XCode` and `XCode Command Line Tools` installed.

```bash
pnpm run build:dev:local
```

Unzip artifact and drag on iOS Simulator to install.

3## Run dev server

```bash
pnpm dev
```

In `sst` Multiplexer choose iOS development server through development client. Do not choose Expo Go as this is buggy for many native features.

## License

Copyright (c) 2025 Paul. All rights reserved.

This project is public for portfolio purposes only. It is not open source.
See [LICENSE](LICENSE) for details.
