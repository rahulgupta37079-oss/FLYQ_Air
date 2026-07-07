import { CircleCheck, Package, Truck, Home } from 'lucide-react'

const STEPS = [
  { icon: CircleCheck, label: 'Order Confirmed', done: true },
  { icon: Package, label: 'Processing', done: true },
  { icon: Truck, label: 'Shipped', done: false },
  { icon: Home, label: 'Delivered', done: false },
]

export default function OrderTracking({ params }: { params: { id: string } }) {
  return (
    <div className="pt-28 max-w-3xl mx-auto px-5 pb-20">
      <h1 className="text-3xl font-extrabold">Track Order <span className="grad-cyber font-mono">#{params.id}</span></h1>
      <p className="text-premium/55 mt-2 text-sm">Live status synced from Shiprocket once shipped. Webhook updates this timeline automatically.</p>

      <div className="glass rounded-2xl p-8 mt-8">
        <div className="flex justify-between relative">
          <div className="absolute top-5 left-8 right-8 h-0.5 bg-border" />
          {STEPS.map(s => (
            <div key={s.label} className="relative z-10 flex flex-col items-center text-center w-1/4">
              <span className={`w-10 h-10 rounded-full grid place-items-center ${s.done ? 'btn-cyber' : 'glass text-premium/40'}`}><s.icon size={18} /></span>
              <span className={`text-xs mt-2 ${s.done ? 'text-premium' : 'text-premium/40'}`}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-6 mt-6">
        <h2 className="font-bold mb-3">Shipment details</h2>
        <dl className="text-sm space-y-2 text-premium/70">
          <div className="flex justify-between"><dt className="text-premium/50">AWB / Tracking</dt><dd className="font-mono">Pending dispatch</dd></div>
          <div className="flex justify-between"><dt className="text-premium/50">Carrier</dt><dd>Bluedart / Delhivery</dd></div>
          <div className="flex justify-between"><dt className="text-premium/50">Estimated delivery</dt><dd>2-7 business days</dd></div>
        </dl>
      </div>
    </div>
  )
}
