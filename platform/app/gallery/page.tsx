import { PageHero, Section } from '@/components/ui/section'
import { PRODUCTS, productImage } from '@/lib/data'

export const metadata = { title: 'Gallery', description: 'Product and event photo gallery.' }

export default function Gallery() {
  // Use the product images as a representative masonry gallery (unique per slot).
  const tiles = PRODUCTS
  return (
    <>
      <PageHero eyebrow="Gallery" title={<>FLYQ in <span className="grad-cyber">frame</span></>} sub="Products from every angle, workshops and field deployments." />
      <Section className="py-12">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {tiles.map(p => (
            <div key={p.slug} className="glass rounded-2xl overflow-hidden card-hover break-inside-avoid">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={productImage(p.slug)} alt={p.name} loading="lazy" className="w-full object-cover" />
              <div className="px-4 py-3 text-sm text-premium/70">{p.name}</div>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
