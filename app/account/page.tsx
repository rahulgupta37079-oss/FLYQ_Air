'use client'
import { useState } from 'react'
import { Package, MapPin, Download, RotateCcw, Star, Gift, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const TABS = [
  { key: 'orders', label: 'Orders', icon: Package },
  { key: 'addresses', label: 'Addresses', icon: MapPin },
  { key: 'downloads', label: 'Downloads', icon: Download },
  { key: 'rma', label: 'Returns / RMA', icon: RotateCcw },
  { key: 'reviews', label: 'My Reviews', icon: Star },
  { key: 'referral', label: 'Referral', icon: Gift },
]

export default function AccountPage() {
  const [tab, setTab] = useState('orders')
  async function signOut() {
    const s = createClient(); if (s) await s.auth.signOut(); window.location.href = '/login'
  }
  return (
    <div className="pt-28 max-w-6xl mx-auto px-5 pb-20">
      <h1 className="text-3xl font-extrabold mb-8">My <span className="grad-cyber">Account</span></h1>
      <div className="grid lg:grid-cols-4 gap-8">
        <aside className="glass rounded-2xl p-3 h-fit">
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${tab === t.key ? 'btn-cyber' : 'hover:bg-cyber/10 text-premium/70'}`}>
              <t.icon size={16} /> {t.label}
            </button>
          ))}
          <button onClick={signOut} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-danger/80 hover:bg-danger/10 mt-1"><LogOut size={16} /> Sign out</button>
        </aside>
        <div className="lg:col-span-3 glass rounded-2xl p-8 min-h-[300px]">
          <p className="text-premium/60 text-sm capitalize mb-4 font-semibold">{tab}</p>
          <p className="text-premium/50 text-sm">
            This panel reads your live data from Supabase once you sign in. Orders, saved addresses, firmware/datasheet downloads, RMA requests, your submitted reviews and your referral code all appear here. Connect Supabase Auth to activate.
          </p>
        </div>
      </div>
    </div>
  )
}
