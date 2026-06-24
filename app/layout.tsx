import type { Metadata } from 'next'
import './globals.css'
import { SITE } from '@/lib/utils'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.brand} — ${SITE.tagline}`, template: `%s · FLYQ` },
  description: SITE.sub,
  keywords: ['FLYQ', 'drone', 'ESP32-S3', 'programmable drone', 'STEM', 'India', 'Passion3D'],
  openGraph: {
    title: `${SITE.brand}`,
    description: SITE.sub,
    url: SITE.url,
    siteName: 'FLYQ',
    locale: 'en_IN',
    type: 'website',
  },
  robots: { index: true, follow: true },
  manifest: '/manifest.webmanifest',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
