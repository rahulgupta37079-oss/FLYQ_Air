import { PageHero, Section, Eyebrow } from '@/components/ui/section'
import LeadForm from '@/components/forms/lead-form'

export const metadata = { title: 'Bulk & Institutional Orders', description: 'Volume pricing for schools, colleges, enterprises and government — GST invoice, EMI, and on-time delivery.' }

const FIELDS = [
  { name: 'company', label: 'Organization / Company', required: true, full: true },
  { name: 'gstin', label: 'GSTIN' },
  { name: 'contact_person', label: 'Contact person', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Phone', type: 'tel', required: true },
  { name: 'product', label: 'Product / SKU of interest', full: true },
  { name: 'quantity', label: 'Estimated quantity', type: 'number', required: true },
  { name: 'timeline', label: 'Required by', options: ['Within 1 week', '2–4 weeks', '1–3 months', 'Flexible'] },
  { name: 'budget', label: 'Indicative budget (₹)' },
  { name: 'message', label: 'Requirements & notes', textarea: true },
]

const PERKS = [
  ['Volume pricing', 'Tiered discounts that scale with order size — the more you order, the lower the unit cost.'],
  ['GST invoice & EMI', 'Proper tax invoice for ITC claims. EMI and PO-based payment terms for institutions.'],
  ['Priority dispatch', 'Reserved stock and expedited Shiprocket logistics for large orders.'],
  ['Onboarding & training', 'Optional setup, teacher training and on-site demos for STEM deployments.'],
  ['Spares & AMC', 'Bundled spares kits and annual maintenance contracts to keep fleets flying.'],
  ['Dedicated manager', 'A single point of contact from quote to delivery and after-sales.'],
]

export default function BulkOrders() {
  return (
    <>
      <PageHero eyebrow="For Institutions & Enterprise" title={<>Bulk & <span className="grad-cyber">Institutional Orders</span></>} sub="Equip a lab, a campus or a fleet. Volume pricing, GST invoicing, EMI and reliable delivery across India." />
      <Section className="py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PERKS.map(([h, d]) => (
            <div key={h} className="glass rounded-2xl p-6 card-hover">
              <h3 className="font-bold text-lg">{h}</h3>
              <p className="text-premium/55 text-sm mt-2 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section className="py-8 grid lg:grid-cols-5 gap-8 items-start">
        <div className="lg:col-span-2 space-y-4">
          <Eyebrow>Get a quote</Eyebrow>
          <h2 className="text-2xl font-bold">Tell us what you need</h2>
          <p className="text-premium/55 text-sm leading-relaxed">Share your requirement and our institutional team will send a tailored quote — typically within one business day. For urgent needs, WhatsApp us directly.</p>
          <ul className="text-sm text-premium/60 space-y-2 mt-4">
            <li>• Schools & ATLs (NEP / ATL aligned kits)</li>
            <li>• Colleges & universities (AICTE labs)</li>
            <li>• Enterprises & system integrators</li>
            <li>• Government & defence procurement</li>
          </ul>
        </div>
        <div className="lg:col-span-3">
          <LeadForm endpoint="/api/leads/bulk" fields={FIELDS} cta="Request a quote" />
        </div>
      </Section>
    </>
  )
}
