'use client'
import { useState } from 'react'
import { ShoppingCart, Check } from 'lucide-react'
import { addToCart } from '@/lib/cart'

export default function AddToCart({ slug, name, price }: { slug: string; name: string; price: number }) {
  const [added, setAdded] = useState(false)
  return (
    <button
      onClick={() => { addToCart({ slug, name, price }); setAdded(true); setTimeout(() => setAdded(false), 1500) }}
      className="px-7 py-3.5 rounded-xl btn-cyber font-bold flex items-center gap-2 hover:scale-105 transition"
    >
      {added ? <><Check size={18} /> Added</> : <><ShoppingCart size={18} /> Add to Cart</>}
    </button>
  )
}
