import { PageHero, Section, Eyebrow } from '@/components/ui/section'
import LeadForm from '@/components/forms/lead-form'
import { STATS } from '@/lib/data'

export const metadata = { title: 'About', description: 'The story behind FLYQ by Passion3D World — engineered in India.' }

const TEAM = [
  ['Founder & CEO', 'Hardware & vision'],
  ['Head of Engineering', 'Firmware & SDK'],
  ['Head of Education', 'Curriculum & STEM'],
  ['Operations', 'Manufacturing & supply'],
]
const CAREER_FIELDS = [
  { name: 'name', label: 'Name', required: true },
  { name: 'role', label: 'Role applying for', required: true },
  { name: 'linkedin', label: 'LinkedIn URL' },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'cover', label: 'Cover letter', textarea: true },
]

export default function About() {
  return (
    <>
      <PageHero eyebrow="Our Story" title={<>Engineered in India.<br /><span className="grad-cyber">Built for the next generation.</span></>} sub="FLYQ is the drone platform of Passion3D World — created to put programmable, open hardware into the hands of every Indian maker." />

      <Section className="py-12 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <Eyebrow>The mission</Eyebrow>
          <p className="mt-5 text-premium/70 leading-relaxed">
            India imports most of its drone technology. We set out to change that — designing an indigenous, ESP32-S3-powered platform that is affordable, fully open-source, and rugged enough for a classroom yet capable enough for research. From a 45g nano trainer to agricultural sprayers, FLYQ is one ecosystem that grows with the pilot.
          </p>
          <p className="mt-4 text-premium/70 leading-relaxed">
            Designed and assembled in Mumbai, with PCBs fabricated in Bengaluru, FLYQ is proudly Made in India.
          </p>
        </div>
        <div className="glass rounded-3xl p-8 grid grid-cols-2 gap-6 text-center">
          {STATS.map(s => <div key={s.label}><div className="text-3xl font-extrabold grad-cyber">{s.value}</div><div className="text-premium/50 text-sm mt-1">{s.label}</div></div>)}
        </div>
      </Section>

      <Section className="py-12">
        <h2 className="text-2xl font-extrabold mb-6">Team</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map(([r, d]) => (
            <div key={r} className="glass rounded-2xl p-6 card-hover text-center">
              <div className="w-16 h-16 rounded-full btn-cyber mx-auto mb-3 grid place-items-center font-extrabold text-ink">F</div>
              <h3 className="font-bold text-sm">{r}</h3>
              <p className="text-premium/50 text-xs mt-1">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="py-12">
        <div className="text-center mb-8"><Eyebrow>Careers</Eyebrow><h2 className="mt-4 text-3xl font-extrabold">Build the future of Indian drones</h2></div>
        <div className="max-w-2xl mx-auto"><LeadForm endpoint="/api/leads/career" fields={CAREER_FIELDS} cta="Apply" /></div>
      </Section>
    </>
  )
}
