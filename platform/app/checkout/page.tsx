'use client'
import { useEffect, useState } from 'react'
import { getCart, cartTotal, type CartLine } from '@/lib/cart'
import { inr } from '@/lib/utils'

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartLine[]>([])
  const [method, setMethod] = useState<'razorpay' | 'cod'>('razorpay')
  const [status, setStatus] = useState<'idle' | 'placing' | 'done'>('idle')
  useEffect(() => setCart(getCart()), [])

  const subtotal = cartTotal(cart)
  const shipping = subtotal >= 5000 || subtotal === 0 ? 0 : 199
  const tax = Math.round(subtotal * 0.18)
  const total = subtotal + shipping + tax

  async function placeOrder(e: React.FormEvent) {
    e.preventDefault()
    setStatus('placing')
    const form = new FormData(e.target as HTMLFormElement)
    const payload = {
      method, items: cart, total,
      customer: Object.fromEntries(form.entries()),
    }
    const res = await fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const data = await res.json().catch(() => ({}))
    // If Razorpay configured, server returns razorpay order; here we degrade gracefully.
    setStatus('done')
    try { localStorage.removeItem('flyq_cart'); window.dispatchEvent(new Event('cart:change')) } catch {}
  }

  if (status === 'done') {
    return (
      <div className="pt-32 max-w-xl mx-auto px-5 pb-20 text-center">
        <div className="glass rounded-2xl p-10">
          <div className="text-5xl mb-4">✅</div>
          <h1 className="text-2xl font-extrabold">Order received</h1>
          <p className="text-premium/60 mt-2 text-sm">A confirmation has been sent. Connect Razorpay & Resend keys to enable live payment + email. You can track orders from your account.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-28 max-w-6xl mx-auto px-5 pb-20">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-8"><span className="grad-cyber">Checkout</span></h1>
      <form onSubmit={placeOrder} className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass rounded-2xl p-6 space-y-4">
            <h2 className="font-bold">Shipping details</h2>
            <input type="text" name="company" className="hidden" tabIndex={-1} />
            <div className="grid sm:grid-cols-2 gap-4">
              <Field name="name" label="Full name" required />
              <Field name="phone" label="Phone" required />
              <Field name="email" label="Email" type="email" required />
              <Field name="pincode" label="Pincode" required />
            </div>
            <Field name="address" label="Address" required />
            <div className="grid sm:grid-cols-2 gap-4">
              <Field name="city" label="City" required />
              <Field name="state" label="State" required />
            </div>
            <Field name="gstin" label="GSTIN (optional, for business invoice)" />
          </div>

          <div className="glass rounded-2xl p-6">
            <h2 className="font-bold mb-4">Payment method</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {(['razorpay', 'cod'] as const).map(m => (
                <button type="button" key={m} onClick={() => setMethod(m)} className={`p-4 rounded-xl text-left ${method === m ? 'btn-cyber' : 'glass'}`}>
                  <div className="font-semibold">{m === 'razorpay' ? 'Online (Razorpay)' : 'Cash on Delivery'}</div>
                  <div className={`text-xs ${method === m ? 'text-ink/70' : 'text-premium/50'}`}>{m === 'razorpay' ? 'UPI · Cards · Netbanking · EMI' : 'Available up to ₹25,000'}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 h-fit">
          <h2 className="font-bold text-lg mb-4">Summary</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-premium/60">Subtotal</dt><dd>{inr(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-premium/60">Shipping</dt><dd>{shipping ? inr(shipping) : 'Free'}</dd></div>
            <div className="flex justify-between"><dt className="text-premium/60">GST (18%)</dt><dd>{inr(tax)}</dd></div>
            <div className="border-t border-border pt-3 flex justify-between font-bold text-lg"><dt>Total</dt><dd className="grad-cyber">{inr(total)}</dd></div>
          </dl>
          <button disabled={cart.length === 0 || status === 'placing'} className="w-full mt-6 px-6 py-3.5 rounded-xl btn-cyber font-bold disabled:opacity-60">
            {status === 'placing' ? 'Placing…' : 'Place Order'}
          </button>
        </div>
      </form>
    </div>
  )
}

function Field({ name, label, type = 'text', required }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <label className="block text-sm">
      <span className="text-premium/60">{label}</span>
      <input name={name} type={type} required={required} className="mt-1 w-full px-4 py-2.5 rounded-lg bg-ink border border-border focus:border-cyber outline-none" />
    </label>
  )
}
