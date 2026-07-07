const { default: esbuild } = await import('esbuild');

esbuild.build({
  entryPoints: ['src/index.tsx'],
  bundle: true,
  outfile: 'dist/_worker.js',
  format: 'esm',
  platform: 'browser',
  target: 'esnext',
  minify: false,
  sourcemap: false,
  logLevel: 'info',
  external: [],
}).then(() => {
  console.log('Build complete!');
  process.exit(0);
}).catch((error) => {
  console.error('Build failed:', error);
  process.exit(1);
});
