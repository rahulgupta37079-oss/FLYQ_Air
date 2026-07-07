// Razorpay — graceful: returns mock order if not configured.
import crypto from 'crypto'

export function razorpayConfigured(): boolean {
  return !!(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET)
}

export async function createRazorpayOrder(amountPaise: number, receipt: string): Promise<{ id: string; amount: number; currency: string; mock?: boolean }> {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET
  if (!keyId || !keySecret) {
    // graceful mock so checkout flow works pre-launch
    return { id: `order_mock_${Date.now()}`, amount: amountPaise, currency: 'INR', mock: true }
  }
  const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64')
  const res = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: amountPaise, currency: 'INR', receipt }),
  })
  if (!res.ok) throw new Error('Razorpay order creation failed')
  return res.json() as Promise<{ id: string; amount: number; currency: string }>
}

export function verifyRazorpaySignature(orderId: string, paymentId: string, signature: string): boolean {
  const secret = process.env.RAZORPAY_KEY_SECRET
  if (!secret) return true // mock mode
  const expected = crypto.createHmac('sha256', secret).update(`${orderId}|${paymentId}`).digest('hex')
  return expected === signature
}
