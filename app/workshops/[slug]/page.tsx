import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Calendar, MapPin, Users, Award } from 'lucide-react'
import { WORKSHOPS } from '@/lib/data'
import { inr, SITE } from '@/lib/utils'
import WorkshopRegForm from '@/components/forms/workshop-reg-form'

export function generateStaticParams() {
  return WORKSHOPS.map(w => ({ slug: w.slug }))
}
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const w = WORKSHOPS.find(x => x.slug === params.slug)
  return w ? { title: w.title, description: `${w.title} · ${w.city}` } : { title: 'Workshop' }
}

export default function WorkshopDetail({ params }: { params: { slug: string } }) {
  const w = WORKSHOPS.find(x => x.slug === params.slug)
  if (!w) notFound()

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Event', name: w.title,
    startDate: w.date, eventStatus: 'https://schema.org/EventScheduled',
    location: { '@type': 'Place', name: w.venue, address: w.city },
    offers: { '@type': 'Offer', price: w.fee, priceCurrency: 'INR', url: `${SITE.url}/workshops/${w.slug}` },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="pt-24" />
      <div className="max-w-5xl mx-auto px-5 pb-20">
        <div className="glass rounded-3xl p-8 grid-bg">
          <span className="px-3 py-1 rounded-full bg-cyber/10 text-cyber text-xs">{w.level} · {w.type}</span>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-4">{w.title}</h1>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-premium/70">
            <span className="flex items-center gap-2"><Calendar size={15} className="text-cyber" />{new Date(w.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span className="flex items-center gap-2"><MapPin size={15} className="text-cyber" />{w.venue}, {w.city}</span>
            <span className="flex items-center gap-2"><Users size={15} className="text-cyber" />{w.seats} seats</span>
            <span className="flex items-center gap-2"><Award size={15} className="text-cyber" />Certificate</span>
          </div>
          <div className="mt-5 text-2xl font-extrabold grad-cyber">{w.fee ? inr(w.fee) : 'Free'}</div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="glass rounded-2xl p-6">
            <h2 className="font-bold mb-3">What you'll build</h2>
            <p className="text-premium/60 text-sm">A hands-on session covering drone assembly, flight control and live programming on the FLYQ Air platform. You'll leave with a working build and a clear path to autonomous flight.</p>
            <h3 className="font-bold mt-5 mb-2 text-sm">Prerequisites</h3>
            <p className="text-premium/55 text-sm">A laptop is recommended. No prior drone experience required for Beginner sessions.</p>
          </div>
          <div className="glass rounded-2xl p-6">
            <h2 className="font-bold mb-3">Schedule</h2>
            <ul className="text-sm text-premium/60 space-y-2">
              <li>09:30 — Registration & kit handout</li>
              <li>10:00 — Fundamentals & safety</li>
              <li>11:30 — Build session</li>
              <li>14:00 — Programming & first flight</li>
              <li>16:30 — Challenge + certificates</li>
            </ul>
          </div>
        </div>

        <div className="glass rounded-2xl overflow-hidden mt-6 aspect-[16/6] grid place-items-center text-premium/40 text-sm">
          Google Map embed · {w.venue}, {w.city}
        </div>

        <h2 className="text-2xl font-extrabold mt-12 mb-5">Register</h2>
        <WorkshopRegForm slug={w.slug} fee={w.fee} />
      </div>
    </>
  )
}
