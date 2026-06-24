'use client'
// Lightweight localStorage cart (works before auth/DB). Syncs to Supabase
// cart_items table when a user is logged in (TODO hook in account).

export type CartLine = { slug: string; name: string; price: number; qty: number }
const KEY = 'flyq_cart'

export function getCart(): CartLine[] {
  if (typeof window === 'undefined') return []
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] }
}
export function setCart(c: CartLine[]) {
  localStorage.setItem(KEY, JSON.stringify(c))
  window.dispatchEvent(new Event('cart:change'))
}
export function addToCart(line: Omit<CartLine, 'qty'>, qty = 1) {
  const c = getCart()
  const f = c.find(l => l.slug === line.slug)
  if (f) f.qty += qty
  else c.push({ ...line, qty })
  setCart(c)
}
export function updateQty(slug: string, qty: number) {
  let c = getCart()
  if (qty <= 0) c = c.filter(l => l.slug !== slug)
  else c = c.map(l => (l.slug === slug ? { ...l, qty } : l))
  setCart(c)
}
export function cartTotal(c: CartLine[]) {
  return c.reduce((s, l) => s + l.price * l.qty, 0)
}
export function cartCount(c: CartLine[]) {
  return c.reduce((s, l) => s + l.qty, 0)
}
