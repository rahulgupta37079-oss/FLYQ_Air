import Link from 'next/link'
import { inr } from '@/lib/utils'
import { productImage, type Product } from '@/lib/data'

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link href={`/products/${p.slug}`} className="glass rounded-2xl overflow-hidden card-hover group flex flex-col">
      <div className="relative aspect-[4/3] bg-black/40 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={productImage(p.slug)} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
        {p.featured && <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold btn-cyber">Featured</span>}
        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] glass capitalize text-premium/80">{p.category}</span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold">{p.name}</h3>
        <p className="text-premium/55 text-sm mt-1 flex-1">{p.short}</p>
        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-lg font-extrabold grad-cyber">{inr(p.price)}</span>
            {p.mrp > p.price && <span className="text-premium/40 line-through text-xs ml-2">{inr(p.mrp)}</span>}
          </div>
          <span className="text-xs text-cyber font-semibold">View →</span>
        </div>
      </div>
    </Link>
  )
}
