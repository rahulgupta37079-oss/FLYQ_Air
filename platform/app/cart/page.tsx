'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Trash2, Minus, Plus } from 'lucide-react'
import { getCart, updateQty, cartTotal, type CartLine } from '@/lib/cart'
import { productImage } from '@/lib/data'
import { inr } from '@/lib/utils'

export default function CartPage() {
  const [cart, setCartState] = useState<CartLine[]>([])
  useEffect(() => {
    const sync = () => setCartState(getCart())
    sync()
    window.addEventListener('cart:change', sync)
    return () => window.removeEventListener('cart:change', sync)
  }, [])

  const subtotal = cartTotal(cart)
  const shipping = subtotal >= 5000 || subtotal === 0 ? 0 : 199
  const tax = Math.round(subtotal * 0.18)
  const total = subtotal + shipping + tax

  return (
    <>
      <div className="pt-28 max-w-6xl mx-auto px-5 pb-20">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8">Your <span className="grad-cyber">Cart</span></h1>
        {cart.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center">
            <p className="text-premium/60">Your cart is empty.</p>
            <Link href="/products" className="inline-block mt-5 px-6 py-3 rounded-xl btn-cyber font-semibold">Browse products</Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map(l => (
                <div key={l.slug} className="glass rounded-2xl p-4 flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={productImage(l.slug)} alt={l.name} className="w-20 h-20 rounded-xl object-cover bg-black/40" />
                  <div className="flex-1">
                    <Link href={`/products/${l.slug}`} className="font-semibold hover:text-cyber">{l.name}</Link>
                    <div className="text-premium/50 text-sm">{inr(l.price)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQty(l.slug, l.qty - 1)} className="w-8 h-8 rounded-lg glass grid place-items-center"><Minus size={14} /></button>
                    <span className="w-8 text-center">{l.qty}</span>
                    <button onClick={() => updateQty(l.slug, l.qty + 1)} className="w-8 h-8 rounded-lg glass grid place-items-center"><Plus size={14} /></button>
                  </div>
                  <div className="w-24 text-right font-bold">{inr(l.price * l.qty)}</div>
                  <button onClick={() => updateQty(l.slug, 0)} className="text-danger/70 hover:text-danger"><Trash2 size={18} /></button>
                </div>
              ))}
            </div>
            <div className="glass rounded-2xl p-6 h-fit">
              <h2 className="font-bold text-lg mb-4">Order Summary</h2>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-premium/60">Subtotal</dt><dd>{inr(subtotal)}</dd></div>
                <div className="flex justify-between"><dt className="text-premium/60">Shipping</dt><dd>{shipping ? inr(shipping) : 'Free'}</dd></div>
                <div className="flex justify-between"><dt className="text-premium/60">GST (18%)</dt><dd>{inr(tax)}</dd></div>
                <div className="border-t border-border pt-3 flex justify-between font-bold text-lg"><dt>Total</dt><dd className="grad-cyber">{inr(total)}</dd></div>
              </dl>
              <Link href="/checkout" className="block text-center mt-6 px-6 py-3.5 rounded-xl btn-cyber font-bold">Proceed to Checkout</Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
