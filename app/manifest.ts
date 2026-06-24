import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FLYQ by Passion3D World',
    short_name: 'FLYQ',
    description: 'India&rsquo;s open-source programmable drone ecosystem — ESP32-S3 powered.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0A0B',
    theme_color: '#0A0A0B',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
