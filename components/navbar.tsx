'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ShoppingCart, User, ChevronDown } from 'lucide-react'
import { CATEGORIES } from '@/lib/data'

const NAV = [
  { href: '/stem-lab', label: 'STEM Lab' },
  { href: '/workshops', label: 'Workshops' },
  { href: '/curriculum', label: 'Curriculum' },
  { href: '/docs', label: 'Docs' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [prodOpen, setProdOpen] = useState(false)
  return (
    <header className="fixed top-0 inset-x-0 z-50 glass">
      <nav className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-9 h-9 rounded-xl btn-cyber grid place-items-center font-extrabold text-ink group-hover:scale-110 transition">F</span>
          <span className="font-extrabold text-xl tracking-tight">FLY<span className="grad-cyber">Q</span></span>
        </Link>

        <div className="hidden lg:flex items-center gap-6 text-sm text-premium/80">
          <div className="relative" onMouseEnter={() => setProdOpen(true)} onMouseLeave={() => setProdOpen(false)}>
            <button className="flex items-center gap-1 hover:text-cyber transition">Products <ChevronDown size={14} /></button>
            {prodOpen && (
              <div className="absolute top-full left-0 pt-3">
                <div className="glass rounded-xl p-2 w-52">
                  {CATEGORIES.map(c => (
                    <Link key={c.slug} href={`/products?cat=${c.slug}`} className="block px-3 py-2 rounded-lg hover:bg-cyber/10 hover:text-cyber transition">{c.name}</Link>
                  ))}
                  <Link href="/products" className="block px-3 py-2 rounded-lg text-cyber font-semibold">All Products →</Link>
                </div>
              </div>
            )}
          </div>
          {NAV.map(n => (
            <Link key={n.href} href={n.href} className="hover:text-cyber transition">{n.label}</Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-xs text-premium/60 font-mono">🇮🇳 INR</span>
          <Link href="/cart" aria-label="Cart" className="w-10 h-10 rounded-lg glass grid place-items-center hover:text-cyber transition"><ShoppingCart size={18} /></Link>
          <Link href="/account" aria-label="Account" className="w-10 h-10 rounded-lg glass grid place-items-center hover:text-cyber transition"><User size={18} /></Link>
          <button className="lg:hidden w-10 h-10 rounded-lg glass grid place-items-center" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden glass border-t border-border px-5 py-4 space-y-1">
          <Link href="/products" className="block py-2 hover:text-cyber" onClick={() => setOpen(false)}>Products</Link>
          {NAV.map(n => (
            <Link key={n.href} href={n.href} className="block py-2 hover:text-cyber" onClick={() => setOpen(false)}>{n.label}</Link>
          ))}
        </div>
      )}
    </header>
  )
}
