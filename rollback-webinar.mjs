import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const ACCOUNT = '1e68c8783130a13e82b2bcc76fa109f1';

async function getCredentials() {
  if (process.env.CLOUDFLARE_API_TOKEN) return process.env.CLOUDFLARE_API_TOKEN.trim();
  const dirs = [
    process.env.APPDATA && join(process.env.APPDATA, 'xdg.config', '.wrangler', 'config', 'default.toml'),
    process.env.APPDATA && join(process.env.APPDATA, '.wrangler', 'config', 'default.toml'),
    join(homedir(), '.config', '.wrangler', 'config', 'default.toml'),
    join(homedir(), '.wrangler', 'config', 'default.toml')
  ].filter(Boolean);
  for (const p of dirs) {
    try {
      const text = await readFile(p, 'utf8');
      const m = text.match(/^oauth_token\s*=\s*"([^"\r\n]+)"/m);
      if (m) return m[1];
    } catch {}
  }
  throw Error('Cloudflare login token not found.');
}

async function rollbackWorker(token, worker) {
  const statePath = join(ROOT, 'private-backups', worker, 'last-release.json');
  const job = JSON.parse(await readFile(statePath, 'utf8'));
  const base = `/accounts/${ACCOUNT}/workers/scripts/${worker}`;
  const r = await fetch(`https://api.cloudflare.com/client/v4${base}/deployments`, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      strategy: 'percentage',
      versions: [{ version_id: job.oldVersion, percentage: 100 }],
      annotations: { 'workers/message': 'Rollback FLYQ webinar release' }
    })
  });
  const j = await r.json();
  if (!j.success) throw Error(`Rollback failed for ${worker}: ${JSON.stringify(j.errors)}`);
  console.log(`Restored ${worker} to version ${job.oldVersion}`);
}

const token = await getCredentials();
await rollbackWorker(token, 'flyq-storefront');
await rollbackWorker(token, 'flyq-workshops');
