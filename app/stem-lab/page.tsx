import Link from 'next/link'
import { Section, Eyebrow, PageHero } from '@/components/ui/section'
import LeadForm from '@/components/forms/lead-form'
import { inr } from '@/lib/utils'

export const metadata = { title: 'STEM Lab & Drone Robotics', description: "India's most deployed Drone Robotics STEM Lab for schools and colleges." }

const INCLUDED = [
  '10× FLYQ Air kits', 'Curriculum (8-week + 16-week)', 'Trainer onboarding (2 days)',
  'Teacher certification', 'Lab signage + safety kit', 'Annual support + firmware updates',
]
const MODULES = [
  ['Grades 6-8', 'Drone basics, block coding, safe flying'],
  ['Grades 9-10', 'Embedded C, sensors, PID intuition'],
  ['Grades 11-12', 'Python autonomy, computer vision, projects'],
  ['College / Polytechnic', 'ESP-IDF, control theory, research'],
  ['Teacher CPD', 'Train-the-trainer + certification'],
]
const OUTCOMES = ['Embedded C', 'Python', 'PID control', 'Computer vision', 'DGCA basics', 'Entrepreneurship']
const ALIGN = ['NEP 2020', 'AICTE', 'ATL', 'PM SHRI', 'Skill India', 'NSQF Level 4-6']
const TIERS = [
  { name: 'Starter', price: 350000, items: ['5 kits', '8-week curriculum', '1-day onboarding', 'Email support'] },
  { name: 'Pro', price: 750000, items: ['10 kits', '8 + 16-week curriculum', '2-day onboarding', 'Teacher certification', 'Priority support'], best: true },
  { name: 'Enterprise', price: 0, items: ['Custom kit count', 'Drone Soccer arena', 'FPV simulator PCs', 'Dedicated success manager'] },
]
const BADGES = ['ISO 9001', 'MSME', 'Startup India', 'GST Registered']

const FIELDS = [
  { name: 'school_name', label: 'School / Institution name', required: true, full: true },
  { name: 'school_type', label: 'Type', options: ['Government', 'Private', 'Atal Tinkering Lab', 'College'], required: true },
  { name: 'city', label: 'City', required: true },
  { name: 'state', label: 'State', required: true },
  { name: 'strength', label: 'Student strength', type: 'number' },
  { name: 'principal_name', label: 'Principal / Head name' },
  { name: 'contact', label: 'Contact number', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'demo_date', label: 'Preferred demo date', type: 'date' },
  { name: 'budget_range', label: 'Budget range', options: ['< ₹3.5L', '₹3.5L - ₹7.5L', '₹7.5L+'] },
  { name: 'message', label: 'Message', textarea: true },
]

export default function StemLab() {
  return (
    <>
      <PageHero eyebrow="STEM Lab × Drone Robotics" title={<>India's Most Deployed <span className="grad-cyber">Drone Robotics STEM Lab</span></>} sub="Turnkey labs for schools, colleges, Atal Tinkering Labs & skill centres." />

      <Section className="pb-8 flex flex-wrap gap-4 justify-center">
        <a href="#lead" className="px-7 py-3.5 rounded-xl btn-cyber font-bold">Request a School Demo</a>
        <a href="#" className="px-7 py-3.5 rounded-xl glass font-semibold hover:text-cyber">Download Brochure (PDF)</a>
      </Section>

      <Section className="py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="glass rounded-2xl p-8">
            <Eyebrow>What's included</Eyebrow>
            <ul className="mt-5 space-y-3">
              {INCLUDED.map(i => <li key={i} className="flex items-center gap-3 text-premium/80"><span className="w-2 h-2 rounded-full bg-signal" />{i}</li>)}
            </ul>
            <p className="text-premium/50 text-sm mt-5">Optional add-ons: Drone Soccer arena, FPV simulator PCs.</p>
          </div>
          <div className="glass rounded-2xl p-8">
            <Eyebrow>Curriculum modules</Eyebrow>
            <div className="mt-5 space-y-3">
              {MODULES.map(([g, d]) => (
                <div key={g} className="border-b border-border pb-3">
                  <div className="font-semibold">{g}</div>
                  <div className="text-premium/55 text-sm">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass rounded-2xl p-8">
            <h3 className="font-bold mb-4">Students learn</h3>
            <div className="flex flex-wrap gap-2">{OUTCOMES.map(o => <span key={o} className="px-3 py-1.5 rounded-full bg-cyber/10 text-cyber text-sm">{o}</span>)}</div>
          </div>
          <div className="glass rounded-2xl p-8">
            <h3 className="font-bold mb-4">Aligned with</h3>
            <div className="flex flex-wrap gap-2">{ALIGN.map(a => <span key={a} className="px-3 py-1.5 rounded-full glass text-sm">{a}</span>)}</div>
          </div>
        </div>
      </Section>

      {/* case studies */}
      <Section className="py-12">
        <h2 className="text-2xl font-extrabold mb-6">Case studies</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            ['Urban Private School', '120 students enrolled in week 1; 8 student-built drones flying by week 6.'],
            ['Govt. Higher Secondary', 'First ATL drone lab in the district; 3 students cleared DGCA nano basics.'],
            ['Engineering College', 'FLYQ Air integrated into embedded systems lab; 2 research papers in progress.'],
          ].map(([t, d]) => (
            <div key={t} className="glass rounded-2xl p-6 card-hover">
              <h3 className="font-bold">{t}</h3>
              <p className="text-premium/55 text-sm mt-2">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* pricing */}
      <Section className="py-12">
        <h2 className="text-3xl font-extrabold text-center mb-10">Pricing <span className="grad-cyber">tiers</span></h2>
        <div className="grid md:grid-cols-3 gap-6">
          {TIERS.map(t => (
            <div key={t.name} className={`glass rounded-2xl p-8 card-hover ${t.best ? 'border-cyber/50 shadow-cyber' : ''}`}>
              {t.best && <span className="px-3 py-1 rounded-full btn-cyber text-xs font-bold">Most Popular</span>}
              <h3 className="font-extrabold text-xl mt-3">{t.name}</h3>
              <div className="text-3xl font-extrabold grad-cyber mt-2">{t.price ? inr(t.price) : 'Custom'}</div>
              <ul className="mt-5 space-y-2 text-sm text-premium/70">
                {t.items.map(i => <li key={i} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-signal" />{i}</li>)}
              </ul>
              <a href="#lead" className="block text-center mt-6 px-6 py-3 rounded-xl btn-cyber font-bold">Get this</a>
            </div>
          ))}
        </div>
      </Section>

      <Section id="lead" className="py-12">
        <div className="text-center mb-8">
          <Eyebrow>Request a demo</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold">Bring a STEM Lab to your campus</h2>
        </div>
        <div className="max-w-3xl mx-auto"><LeadForm endpoint="/api/leads/stem" fields={FIELDS} cta="Request School Demo" /></div>
        <div className="flex flex-wrap gap-3 justify-center mt-8">{BADGES.map(b => <span key={b} className="px-3 py-1.5 rounded-full glass text-xs text-premium/60">{b}</span>)}</div>
        <p className="text-center mt-6"><Link href="/stem-lab/drone-soccer" className="text-cyber text-sm font-semibold">Explore Drone Soccer tournaments →</Link></p>
      </Section>
    </>
  )
}
