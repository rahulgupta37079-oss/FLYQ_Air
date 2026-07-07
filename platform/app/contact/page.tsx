import { PageHero, Section } from '@/components/ui/section'
import LeadForm from '@/components/forms/lead-form'
import { MapPin, Mail, Phone, MessageCircle } from 'lucide-react'
import { SITE, waLink } from '@/lib/utils'

export const metadata = { title: 'Contact', description: 'Get in touch with the FLYQ team.' }

const FIELDS = [
  { name: 'name', label: 'Name', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Phone' },
  { name: 'subject', label: 'Subject' },
  { name: 'message', label: 'Message', textarea: true, required: true },
]

export default function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact" title={<>Talk to <span className="grad-cyber">FLYQ</span></>} sub="Sales, support, partnerships — we usually reply within a few hours." />
      <Section className="py-12 grid lg:grid-cols-3 gap-8">
        <div className="space-y-4">
          {[
            [MapPin, 'Address', 'Mumbai, Maharashtra, India'],
            [Mail, 'Email', SITE.email],
            [Phone, 'Phone', SITE.phone],
          ].map(([Icon, h, v]: any) => (
            <div key={h} className="glass rounded-2xl p-5 flex items-center gap-4">
              <span className="w-10 h-10 rounded-xl bg-cyber/10 grid place-items-center text-cyber"><Icon size={18} /></span>
              <div><div className="text-xs text-premium/50">{h}</div><div className="font-semibold text-sm">{v}</div></div>
            </div>
          ))}
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="glass rounded-2xl p-5 flex items-center gap-4 hover:text-cyber transition">
            <span className="w-10 h-10 rounded-xl grid place-items-center text-white" style={{ background: '#25D366' }}><MessageCircle size={18} /></span>
            <div><div className="text-xs text-premium/50">WhatsApp</div><div className="font-semibold text-sm">Chat now</div></div>
          </a>
          <div className="glass rounded-2xl overflow-hidden aspect-[4/3] grid place-items-center text-premium/40 text-sm">Google Map embed · Mumbai</div>
        </div>
        <div className="lg:col-span-2"><LeadForm endpoint="/api/contact" fields={FIELDS} cta="Send message" /></div>
      </Section>
    </>
  )
}
