import Link from 'next/link'
import { Instagram, Youtube, Twitter, MapPin, Mail, Phone, Store } from 'lucide-react'
import { SITE } from '@/lib/utils'
import NewsletterForm from '@/components/forms/newsletter-form'

const COLS = [
  { h: 'Products', links: [['FLYQ Air','/products/flyq-air'],['FLYQ Vision','/products/flyq-vision'],['Agriculture','/products?cat=agriculture'],['FPV','/products?cat=fpv'],['Parts','/products?cat=parts']] },
  { h: 'Resources', links: [['Docs','/docs'],['Curriculum','/curriculum'],['Workshops','/workshops'],['Blog','/blog'],['Gallery','/gallery']] },
  { h: 'Company', links: [['About','/about'],['STEM Lab','/stem-lab'],['Dealers','/dealers'],['Bulk Orders','/bulk-orders'],['Contact','/contact']] },
  { h: 'Legal', links: [['Terms','/terms'],['Privacy','/privacy'],['Refund','/refund'],['Shipping','/shipping'],['Warranty','/warranty']] },
]

export default function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-7xl mx-auto px-5 py-14">
        <div className="grid md:grid-cols-6 gap-10">
          <div className="md:col-span-2">
            <div className="font-extrabold text-2xl mb-3">FLY<span className="grad-cyber">Q</span></div>
            <p className="text-premium/60 text-sm max-w-xs">{SITE.brand}. India's open-source programmable drone ecosystem. {SITE.tagline}</p>
            <div className="mt-5 text-sm text-premium/60 space-y-2">
              <p className="flex items-center gap-2"><MapPin size={15} className="text-cyber" /> Mumbai, Maharashtra, India</p>
              <p className="flex items-center gap-2"><Mail size={15} className="text-cyber" /> <a href={`mailto:${SITE.email}`} className="hover:text-cyber">{SITE.email}</a></p>
              <p className="flex items-center gap-2"><Phone size={15} className="text-cyber" /> {SITE.phone}</p>
              <p className="flex items-center gap-2"><Store size={15} className="text-cyber" /> <a href={SITE.store} target="_blank" rel="noopener noreferrer" className="hover:text-cyber">Official Store</a></p>
              <p className="text-xs text-premium/40">GSTIN: <span className="font-mono">GSTIN-PLACEHOLDER</span></p>
            </div>
            <div className="flex gap-3 mt-5 text-premium/70">
              <a href="#" aria-label="Instagram" className="hover:text-cyber"><Instagram size={20} /></a>
              <a href="#" aria-label="YouTube" className="hover:text-cyber"><Youtube size={20} /></a>
              <a href="#" aria-label="Twitter" className="hover:text-cyber"><Twitter size={20} /></a>
            </div>
            <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs">
              <span className="text-orange-400">🇮🇳</span> Made in India
            </div>
          </div>
          {COLS.map(col => (
            <div key={col.h}>
              <h4 className="font-semibold mb-3">{col.h}</h4>
              <ul className="space-y-2 text-sm text-premium/60">
                {col.links.map(([label, href]) => (
                  <li key={href}><Link href={href} className="hover:text-cyber transition">{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 glass rounded-2xl p-6 md:flex items-center justify-between gap-6">
          <div>
            <h4 className="font-bold text-lg">Stay Updated</h4>
            <p className="text-premium/60 text-sm">Firmware drops, workshops & launches. Double opt-in.</p>
          </div>
          <div className="mt-4 md:mt-0 md:w-96"><NewsletterForm /></div>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-premium/40">
        © {new Date().getFullYear()} FLYQ by Passion3D World. All rights reserved.
      </div>
    </footer>
  )
}
