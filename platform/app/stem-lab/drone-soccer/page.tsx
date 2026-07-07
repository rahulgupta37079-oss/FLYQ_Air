import { PageHero, Section, Eyebrow } from '@/components/ui/section'
import LeadForm from '@/components/forms/lead-form'

export const metadata = { title: 'Drone Soccer', description: 'Inter-school Drone Soccer tournaments & arena setup.' }

const FIELDS = [
  { name: 'school_name', label: 'School / Team name', required: true, full: true },
  { name: 'city', label: 'City', required: true },
  { name: 'contact', label: 'Contact', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'team_size', label: 'Team size', type: 'number' },
  { name: 'message', label: 'Message', textarea: true },
]

export default function DroneSoccer() {
  return (
    <>
      <PageHero eyebrow="STEM Lab · Sport" title={<>Drone <span className="grad-cyber">Soccer</span></>} sub="The fastest-growing STEM sport — build, pilot and compete. Arena setup + inter-school tournaments." />
      <Section className="py-12 grid md:grid-cols-3 gap-6">
        {[
          ['Build', 'Teams assemble caged drones and learn flight control fundamentals.'],
          ['Pilot', 'Strikers, defenders and a goalkeeper coordinate in a live arena.'],
          ['Compete', 'Inter-school leagues with rankings, medals and certificates.'],
        ].map(([h, d]) => (
          <div key={h} className="glass rounded-2xl p-7 card-hover"><h3 className="font-bold text-lg">{h}</h3><p className="text-premium/55 text-sm mt-2">{d}</p></div>
        ))}
      </Section>
      <Section className="py-12">
        <div className="text-center mb-8"><Eyebrow>Register your team</Eyebrow><h2 className="mt-4 text-3xl font-extrabold">Join a tournament</h2></div>
        <div className="max-w-2xl mx-auto"><LeadForm endpoint="/api/leads/bulk" fields={FIELDS} cta="Register Team" /></div>
      </Section>
    </>
  )
}
