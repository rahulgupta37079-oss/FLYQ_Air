import build from '@hono/vite-build/cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    build({
      outputDir: 'dist',
      minify: false,  // Disable minification for faster builds
      external: [],
      emptyOutDir: false
    }),
    devServer({
      adapter,
      entry: 'src/index.tsx'
    })
  ],
  build: {
    sourcemap: false,  // Disable source maps
    rollupOptions: {
      external: [],
      output: {
        manualChunks: undefined  // Disable code splitting for simpler build
      }
    }
  },
  publicDir: 'public'
})
