import { PageHero, Section, Eyebrow } from '@/components/ui/section'
import LeadForm from '@/components/forms/lead-form'

export const metadata = { title: 'Become a Dealer', description: 'Join the FLYQ reseller & dealer program.' }

const FIELDS = [
  { name: 'company', label: 'Company name', required: true, full: true },
  { name: 'city', label: 'City', required: true },
  { name: 'state', label: 'State', required: true },
  { name: 'years_in_business', label: 'Years in business', type: 'number' },
  { name: 'current_lines', label: 'Current product lines' },
  { name: 'monthly_volume', label: 'Expected monthly volume' },
  { name: 'message', label: 'Tell us about your business', textarea: true },
]

export default function Dealers() {
  return (
    <>
      <PageHero eyebrow="Partner Program" title={<>Become a <span className="grad-cyber">FLYQ Dealer</span></>} sub="Healthy margins, on-time delivery, marketing support and a product line that sells." />
      <Section className="py-12 grid lg:grid-cols-3 gap-8">
        <div className="space-y-4">
          {[['Margins', 'Competitive dealer pricing across the catalog.'], ['Support', 'Co-marketing, demo units & training.'], ['Reliability', 'On-time delivery and zero-defect commitment.']].map(([h, d]) => (
            <div key={h} className="glass rounded-2xl p-5"><h3 className="font-bold">{h}</h3><p className="text-premium/55 text-sm mt-1">{d}</p></div>
          ))}
        </div>
        <div className="lg:col-span-2">
          <Eyebrow>Apply now</Eyebrow>
          <div className="mt-4"><LeadForm endpoint="/api/leads/dealer" fields={FIELDS} cta="Submit application" /></div>
        </div>
      </Section>
    </>
  )
}
