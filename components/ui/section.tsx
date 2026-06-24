import { cn } from '@/lib/utils'

export function Section({ className, children, id }: { className?: string; children: React.ReactNode; id?: string }) {
  return <section id={id} className={cn('max-w-7xl mx-auto px-5', className)}>{children}</section>
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-3 py-1.5 rounded-full glass text-xs text-cyber uppercase tracking-widest font-semibold">
      {children}
    </span>
  )
}

export function PageHero({ eyebrow, title, sub }: { eyebrow?: string; title: React.ReactNode; sub?: string }) {
  return (
    <header className="relative pt-32 pb-12 grid-bg overflow-hidden">
      <div className="absolute -top-20 right-10 w-96 h-96 bg-cyber/10 rounded-full blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-5 text-center">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="mt-5 text-4xl md:text-6xl font-extrabold tracking-tight">{title}</h1>
        {sub && <p className="text-premium/60 mt-4 max-w-2xl mx-auto">{sub}</p>}
      </div>
    </header>
  )
}
