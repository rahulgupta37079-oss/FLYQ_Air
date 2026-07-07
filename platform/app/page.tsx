import Link from 'next/link'
import { ArrowRight, Cpu, Gauge, Feather, Code2, CircleCheck } from 'lucide-react'
import { Section, Eyebrow } from '@/components/ui/section'
import ProductCard from '@/components/product-card'
import TestimonialWall from '@/components/sections/testimonial-wall'
import { PRODUCTS, CATEGORIES, WORKSHOPS, FAQS, STATS } from '@/lib/data'
import { inr, waLink } from '@/lib/utils'

const MASTERY = [
  { icon: Cpu, h: 'Processor', s: 'ESP32-S3 dual-core, Wi-Fi + BLE, on-board ML' },
  { icon: Gauge, h: 'Stability', s: '6-axis gyro, sub-millisecond control loop' },
  { icon: Feather, h: 'Weight', s: '45g — DGCA nano-category, fly anywhere' },
  { icon: Code2, h: 'Development', s: '100% open-source firmware & SDK' },
]
const SPECS = ['ESP32-S3', '45g', '5-7 min', 'Coreless 8.5×20mm', '650mAh', '100m range']
const TRUSTED = ['Passion3D World', 'Espressif Systems', 'IITs', 'Crazyflie Ecosystem', 'DGCA Partners']

export default function Home() {
  const featured = PRODUCTS.filter(p => p.featured).slice(0, 6)
  const upcoming = WORKSHOPS.slice(0, 6)
  return (
    <>
      {/* status pill */}
      <div className="pt-16" />
      <div className="flex justify-center pt-4">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-signal animate-pulse" /> LIVE FEED · SYSTEM NORMAL
        </span>
      </div>

      {/* HERO */}
      <header className="relative min-h-[88vh] flex items-center grid-bg overflow-hidden">
        <div className="absolute -top-32 -right-24 w-[40rem] h-[40rem] bg-cyber/15 rounded-full blur-3xl" />
        <Section className="relative grid lg:grid-cols-2 gap-12 items-center py-16">
          <div>
            <Eyebrow>Indigenous · ESP32-S3 Powered · Developer-Ready</Eyebrow>
            <h1 className="mt-6 font-extrabold leading-[1.03] text-5xl md:text-7xl tracking-tight">
              Engineering Mastery.<br /><span className="grad-cyber">Forged in India.</span>
            </h1>
            <p className="mt-6 text-premium/60 text-lg max-w-md">
              Indigenous programmable drone platform powering the next million pilots, makers and innovators.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/products/flyq-air" className="px-7 py-3.5 rounded-xl btn-cyber font-bold flex items-center gap-2 hover:scale-105 transition">Shop FLYQ Air <ArrowRight size={18} /></Link>
              <Link href="/stem-lab" className="px-7 py-3.5 rounded-xl glass font-semibold hover:text-cyber transition">Book a STEM Lab Demo</Link>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm font-mono text-premium/70">
              {['Pilot', 'Developer', 'System Online', 'Ready for Development'].map(t => (
                <span key={t} className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-signal" />{t}</span>
              ))}
            </div>
          </div>
          <div className="relative grid place-items-center">
            <div className="absolute inset-0 bg-cyber/10 blur-3xl rounded-full" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/products/flyq-hero-drone.png" alt="FLYQ Air programmable drone" className="relative w-full max-w-lg rounded-3xl animate-float" />
          </div>
        </Section>
      </header>

      {/* ENGINEERING MASTERY */}
      <Section className="py-20">
        <div className="text-center mb-12">
          <Eyebrow>Engineering Mastery</Eyebrow>
          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold">Built like <span className="grad-cyber">precision hardware</span></h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MASTERY.map(m => (
            <div key={m.h} className="glass rounded-2xl p-6 card-hover group">
              <span className="w-12 h-12 rounded-xl bg-cyber/10 grid place-items-center text-cyber group-hover:shadow-cyber transition"><m.icon size={22} /></span>
              <h3 className="font-bold mt-4">{m.h}</h3>
              <p className="text-premium/55 text-sm mt-1">{m.s}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* SPEC COUNTERS */}
      <Section className="pb-16">
        <div className="glass rounded-3xl p-8 grid grid-cols-3 md:grid-cols-6 gap-6 text-center">
          {SPECS.map(s => (
            <div key={s}><div className="text-xl md:text-2xl font-extrabold grad-cyber font-mono">{s}</div></div>
          ))}
        </div>
      </Section>

      {/* CATEGORY TILES */}
      <Section className="py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold">Complete Drone <span className="grad-cyber">Solutions</span></h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {CATEGORIES.map(c => (
            <Link key={c.slug} href={`/products?cat=${c.slug}`} className="glass rounded-2xl p-5 text-center card-hover">
              <div className="text-2xl mb-2">🛩️</div>
              <div className="font-semibold text-sm">{c.name}</div>
            </Link>
          ))}
        </div>
      </Section>

      {/* FEATURED */}
      <Section className="py-12">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold">Featured <span className="grad-cyber">Products</span></h2>
          <Link href="/products" className="text-cyber text-sm font-semibold">All products →</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map(p => <ProductCard key={p.slug} p={p} />)}
        </div>
      </Section>

      {/* STEM LAB TEASER */}
      <Section className="py-12">
        <div className="rounded-3xl p-10 md:p-14 relative overflow-hidden glass">
          <div className="absolute -top-20 left-1/3 w-96 h-96 bg-signal/10 blur-3xl rounded-full" />
          <div className="relative md:flex items-center justify-between gap-8">
            <div>
              <Eyebrow>STEM Lab × Drone Robotics</Eyebrow>
              <h2 className="mt-4 text-3xl md:text-4xl font-extrabold max-w-xl">Set up a Drone Robotics STEM Lab at your school</h2>
              <p className="text-premium/60 mt-3 max-w-lg">Turnkey labs aligned with NEP 2020, AICTE, ATL & Skill India. 10 kits, curriculum, trainer onboarding & certification.</p>
            </div>
            <Link href="/stem-lab" className="mt-6 md:mt-0 inline-flex px-7 py-3.5 rounded-xl btn-cyber font-bold whitespace-nowrap hover:scale-105 transition">Explore STEM Lab</Link>
          </div>
        </div>
      </Section>

      {/* WORKSHOPS */}
      <Section className="py-12">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold">Upcoming <span className="grad-cyber">Workshops</span></h2>
          <Link href="/workshops" className="text-cyber text-sm font-semibold">All events →</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcoming.map(w => (
            <Link key={w.slug} href={`/workshops/${w.slug}`} className="glass rounded-2xl p-6 card-hover">
              <div className="flex items-center justify-between text-xs text-premium/50">
                <span>{new Date(w.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                <span className="px-2 py-0.5 rounded-full bg-cyber/10 text-cyber">{w.level}</span>
              </div>
              <h3 className="font-bold mt-3">{w.title}</h3>
              <p className="text-premium/55 text-sm mt-1">{w.city} · {w.venue}</p>
              <div className="mt-4 font-semibold grad-cyber">{w.fee ? inr(w.fee) : 'Free'}</div>
            </Link>
          ))}
        </div>
      </Section>

      {/* STATS */}
      <Section className="py-12">
        <div className="glass rounded-3xl p-10 grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
          {STATS.map(s => (
            <div key={s.label}><div className="text-3xl md:text-4xl font-extrabold grad-cyber">{s.value}</div><div className="text-premium/50 text-sm mt-1">{s.label}</div></div>
          ))}
        </div>
      </Section>

      {/* TRUSTED BY */}
      <Section className="py-12">
        <p className="text-center text-premium/40 text-sm uppercase tracking-widest mb-6">Trusted by</p>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-premium/40 font-semibold">
          {TRUSTED.map(t => <span key={t}>{t}</span>)}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section className="py-16">
        <div className="text-center mb-8">
          <Eyebrow>Real Conversations</Eyebrow>
          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold">What pilots are <span className="grad-cyber">saying</span></h2>
        </div>
        <TestimonialWall />
      </Section>

      {/* WHY FLYQ */}
      <Section className="py-12">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { h: 'Powerful Hardware', s: 'ESP32-S3, 6-axis IMU, 24-pin expansion — research-grade in a 45g airframe.' },
            { h: 'Easy Programming', s: 'Block coding to Python to ESP-IDF. One platform grows with the learner.' },
            { h: 'Learning Resources', s: '8-week curriculum, docs, SDK and an active maker community.' },
          ].map(c => (
            <div key={c.h} className="glass rounded-2xl p-7 card-hover">
              <CircleCheck className="text-signal" />
              <h3 className="font-bold mt-3">{c.h}</h3>
              <p className="text-premium/55 text-sm mt-1">{c.s}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section className="py-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8">Frequently <span className="grad-cyber">Asked</span></h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.slice(0, 6).map((f, i) => (
            <details key={i} className="glass rounded-xl p-5 group">
              <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">{f.q}<span className="text-cyber group-open:rotate-45 transition">+</span></summary>
              <p className="text-premium/60 text-sm mt-3">{f.a}</p>
            </details>
          ))}
        </div>
        <div className="text-center mt-6"><Link href="/faq" className="text-cyber text-sm font-semibold">All FAQs →</Link></div>
      </Section>

      {/* FINAL CTA */}
      <Section className="py-16">
        <div className="glass rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyber/15 blur-3xl rounded-full" />
          <h2 className="relative text-3xl md:text-5xl font-extrabold">Ready to Start Flying?</h2>
          <p className="relative text-premium/60 mt-3">Join the next generation of Indian pilots, makers and innovators.</p>
          <div className="relative mt-7 flex flex-wrap gap-4 justify-center">
            <Link href="/products" className="px-8 py-3.5 rounded-xl btn-cyber font-bold hover:scale-105 transition">Shop Now</Link>
            <a href={waLink('Hi FLYQ, I want to talk to an expert.')} target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 rounded-xl glass font-semibold hover:text-cyber transition">Talk to an Expert</a>
          </div>
        </div>
      </Section>
    </>
  )
}
