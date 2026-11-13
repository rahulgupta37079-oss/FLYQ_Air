import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const ROOT = dirname(fileURLToPath(import.meta.url));
const ACCOUNT = '1e68c8783130a13e82b2bcc76fa109f1';
const TAG = 'flyq-webinar-2026-11-13-v1';
const LOGO_PNG_PATH = 'C:\\Users\\PROFESSORHULK\\Downloads\\FLYQ-LOGO-UPDATE\\FLYQ-LOGO-UPDATE\\logo-blue.png';
const KIT_PDF_PATH = 'C:\\Users\\PROFESSORHULK\\.gemini\\antigravity\\scratch\\flyq-premium-guides\\output\\FLYQ-Drone-Kit-Guide.pdf';

const sha = b => createHash('sha256').update(b).digest('hex');
const stable = v =>
  JSON.stringify(v, (_, x) =>
    x && typeof x === 'object' && !Array.isArray(x)
      ? Object.fromEntries(Object.entries(x).sort(([a], [b]) => a.localeCompare(b)))
      : x
  );

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

async function cfRequest(token, path, options = {}) {
  const r = await fetch('https://api.cloudflare.com/client/v4' + path, {
    ...options,
    headers: { ...options.headers, Authorization: 'Bearer ' + token },
    redirect: 'error',
    signal: AbortSignal.timeout(60000)
  });
  if (!r.ok) {
    const errText = await r.text().catch(() => '');
    throw Error(`Cloudflare HTTP ${r.status} at ${path}: ${errText}`);
  }
  return r;
}

async function cfApi(token, path, method = 'GET', body) {
  const r = await cfRequest(token, path, {
    method,
    ...(body === undefined ? {} : { body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } })
  });
  const j = await r.json();
  if (j.success !== true) {
    throw Error(`Cloudflare rejected ${method} ${path}: ${JSON.stringify(j.errors)}`);
  }
  return j.result;
}

function activeVersion(data) {
  const rows = Array.isArray(data) ? data : data.deployments;
  const d = [...rows].sort((a, b) => Date.parse(b.created_on) - Date.parse(a.created_on))[0];
  return d.versions[0].version_id;
}

async function parseModules(response) {
  const entry = response.headers.get('cf-entrypoint');
  const form = await response.formData();
  const files = [];
  for (const [name, file] of form) {
    if (typeof file === 'string') continue;
    const bytes = Buffer.from(await file.arrayBuffer());
    files.push({ name, type: file.type, bytes });
  }
  return { entry, files };
}

function buildUploadMetadata(info, settings, mainModule) {
  const r = info.resources;
  const m = {
    main_module: mainModule,
    bindings: r.bindings.map(b => ({ name: b.name, type: 'inherit' })),
    keep_assets: true,
    compatibility_date: r.script_runtime.compatibility_date,
    compatibility_flags: r.script_runtime.compatibility_flags || [],
    annotations: {
      'workers/message': 'FLYQ ₹99 Live Drone Webinar + SEO + Logo + Admin Desk release',
      'workers/tag': TAG
    }
  };
  if (r.script_runtime.limits) m.limits = r.script_runtime.limits;
  if (r.script?.placement_mode === 'smart') m.placement = { mode: 'smart' };
  for (const k of ['logpush', 'tail_consumers', 'observability']) {
    if (settings[k] !== undefined) m[k] = settings[k];
  }
  return m;
}

async function deployWorker(token, worker) {
  console.log(`\n=== Deploying ${worker} ===`);
  const base = `/accounts/${ACCOUNT}/workers/scripts/${worker}`;
  const active = activeVersion(await cfApi(token, base + '/deployments'));
  const info = await cfApi(token, base + '/versions/' + active);
  const settings = await cfApi(token, base + '/script-settings');
  const contentResp = await cfRequest(token, base + '/content/v2?version=' + active);
  const snapshot = await parseModules(contentResp);

  // Save private backup
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = join(ROOT, 'private-backups', worker, stamp);
  await mkdir(join(backupDir, 'modules'), { recursive: true });
  for (const f of snapshot.files) {
    const p = join(backupDir, 'modules', f.name);
    await mkdir(dirname(p), { recursive: true });
    await writeFile(p, f.bytes);
  }
  await writeFile(join(backupDir, 'version.json'), JSON.stringify(info, null, 2));
  await writeFile(join(backupDir, 'script-settings.json'), JSON.stringify(settings, null, 2));

  const mainModule =
    worker === 'flyq-storefront'
      ? 'flyq-storefront-webinar-entry.mjs'
      : 'flyq-workshops-webinar-entry.mjs';
  const metadata = buildUploadMetadata(info, settings, mainModule);

  const replacedNames = new Set([
    'flyq-logo-entry-20261102.mjs',
    'flyq-seo-entry-20261101.mjs',
    'flyq-seo.mjs',
    'flyq-seo-metadata.mjs',
    'flyq-logo.mjs',
    'flyq-logo-image.mjs',
    'flyq-webinar-page.mjs',
    'flyq-webinar-assets.mjs',
    'flyq-storefront-webinar-entry.mjs',
    'flyq-workshops-webinar-entry.mjs',
    'kit-guide.pdf'
  ]);

  const form = new FormData();
  form.set('metadata', JSON.stringify(metadata));

  for (const f of snapshot.files) {
    if (replacedNames.has(f.name)) continue;
    form.set(f.name, new File([f.bytes], f.name, { type: f.type }));
  }

  // Add common updated modules
  const logoBase64 = (await readFile(LOGO_PNG_PATH)).toString('base64');
  form.set(
    'flyq-logo-image.mjs',
    new File([`export default ${JSON.stringify(logoBase64)};`], 'flyq-logo-image.mjs', {
      type: 'application/javascript+module'
    })
  );

  for (const modName of ['flyq-seo-metadata.mjs', 'flyq-seo.mjs', 'flyq-logo.mjs', 'flyq-webinar-page.mjs', mainModule]) {
    const code = await readFile(join(ROOT, modName), 'utf8');
    form.set(modName, new File([code], modName, { type: 'application/javascript+module' }));
  }

  if (worker === 'flyq-storefront') {
    const assetsCode = await readFile(join(ROOT, 'flyq-webinar-assets.mjs'), 'utf8');
    form.set('flyq-webinar-assets.mjs', new File([assetsCode], 'flyq-webinar-assets.mjs', { type: 'application/javascript+module' }));
    const pdfBytes = await readFile(KIT_PDF_PATH);
    form.set('kit-guide.pdf', new File([pdfBytes], 'kit-guide.pdf', { type: 'application/octet-stream' }));
  }

  console.log(`Uploading new version for ${worker} (base: ${active})...`);
  const uploadResp = await cfRequest(
    token,
    base + '/versions?bindings_inherit=strict&include_subdomain_availability=true&excludeScript=true',
    { method: 'POST', body: form }
  );
  const uploadJson = await uploadResp.json();
  if (uploadJson.success !== true) {
    throw Error(`Version upload failed for ${worker}: ${JSON.stringify(uploadJson.errors)}`);
  }
  const newVersion = uploadJson.result.id;
  console.log(`Uploaded version ${newVersion} for ${worker}. Verifying bindings...`);

  let nextInfo = uploadJson.result;
  if (!nextInfo?.resources?.bindings) {
    for (let attempt = 0; attempt < 5; attempt++) {
      try {
        nextInfo = await cfApi(token, base + '/versions/' + newVersion);
        break;
      } catch (e) {
        if (attempt === 4) throw e;
        await new Promise(r => setTimeout(r, 1200));
      }
    }
  }
  const bindingShape = x => [...x.resources.bindings].sort((a, b) => a.name.localeCompare(b.name));
  if (stable(bindingShape(nextInfo)) !== stable(bindingShape(info))) {
    throw Error(`Binding mismatch detected in ${worker} draft version ${newVersion}. Aborting deployment.`);
  }

  console.log(`Publishing version ${newVersion} to 100% traffic on ${worker}...`);
  await cfApi(token, base + '/deployments', 'POST', {
    strategy: 'percentage',
    versions: [{ version_id: newVersion, percentage: 100 }],
    annotations: { 'workers/message': 'Publish FLYQ ₹99 Live Drone Webinar + SEO + Admin Desk' }
  });

  let baselineOldVersion = active;
  try {
    const prevRelease = JSON.parse(await readFile(join(ROOT, 'private-backups', worker, 'last-release.json'), 'utf8'));
    if (prevRelease && prevRelease.oldVersion) baselineOldVersion = prevRelease.oldVersion;
  } catch {}

  await writeFile(
    join(ROOT, 'private-backups', worker, 'last-release.json'),
    JSON.stringify({ worker, oldVersion: baselineOldVersion, previousVersion: active, newVersion, backupDir, deployedAt: new Date().toISOString() }, null, 2)
  );
  console.log(`✓ LIVE on ${worker}: ${newVersion} (previous: ${active})`);
}

const token = await getCredentials();
await deployWorker(token, 'flyq-workshops');
await deployWorker(token, 'flyq-storefront');
console.log('\n=== BOTH WORKERS DEPLOYED SUCCESSFULLY ===');
