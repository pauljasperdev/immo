import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { Resource } from 'sst';

// Get the API URL from environment (set by SST)
const serverUrl = Resource.Api.url;

// Get .env file path (relative to workspace root)
// Since this script runs from workspace root via pnpm --filter, use process.cwd()
const workspaceRoot = process.cwd().replace(/\/packages\/scripts.*$/, '');
const envPath = join(workspaceRoot, 'apps/native/.env');

// Read existing .env file if it exists
let envContent = '';
if (existsSync(envPath)) {
  envContent = readFileSync(envPath, 'utf-8');
}

// Parse and update EXPO_PUBLIC_SERVER_URL
const lines = envContent.split('\n');
let found = false;
const updatedLines = lines.map((line) => {
  const trimmed = line.trim();
  // Match EXPO_PUBLIC_SERVER_URL with or without value
  if (trimmed.startsWith('EXPO_PUBLIC_SERVER_URL=')) {
    found = true;
    return `EXPO_PUBLIC_SERVER_URL=${serverUrl}`;
  }
  return line;
});

// Add EXPO_PUBLIC_SERVER_URL if it wasn't found
if (!found) {
  updatedLines.push(`EXPO_PUBLIC_SERVER_URL=${serverUrl}`);
}

// Write back to file
writeFileSync(envPath, `${updatedLines.join('\n')}\n`, 'utf-8');
console.log(
  `✓ Updated EXPO_PUBLIC_SERVER_URL=${serverUrl} in apps/native/.env`
);
