import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const remotes = ['products', 'cart', 'checkout', 'profile'];
const localPorts = { products: 4201, cart: 4202, checkout: 4203, profile: 4204 };
const isVercelBuild = process.env.VERCEL === '1';

const manifest = Object.fromEntries(
  remotes.map((remote) => {
    const key = 'FEDERATION_' + remote.toUpperCase() + '_URL';
    const value = process.env[key] ?? (isVercelBuild ? '' : 'http://localhost:' + localPorts[remote] + '/remoteEntry.json');

    if (!value) throw new Error('Missing required Vercel environment variable: ' + key);

    const url = new URL(value);
    if (url.pathname !== '/remoteEntry.json' || url.username || url.password) {
      throw new Error(key + ' must be an absolute remoteEntry.json URL without credentials.');
    }
    if (isVercelBuild && url.protocol !== 'https:') {
      throw new Error(key + ' must use HTTPS for Vercel deployments.');
    }

    return [remote, url.toString()];
  }),
);

const manifestPath = resolve('apps/shell/public/federation.manifest.json');
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
console.info('Generated federation manifest for ' + (isVercelBuild ? 'Vercel' : 'local') + ' build.');
