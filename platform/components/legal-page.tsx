import { PageHero, Section } from '@/components/ui/section'
import { SITE } from '@/lib/utils'

export type LegalSection = { h: string; p: string[] }

export default function LegalPage({ title, updated, intro, sections }: {
  title: string; updated: string; intro?: string; sections: LegalSection[]
}) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} sub={`Last updated: ${updated}`} />
      <Section className="py-12 max-w-3xl">
        {intro && <p className="text-premium/70 leading-relaxed mb-8">{intro}</p>}
        <div className="space-y-8">
          {sections.map((s, i) => (
            <div key={i}>
              <h2 className="text-xl font-bold mb-3">{i + 1}. {s.h}</h2>
              {s.p.map((para, j) => (
                <p key={j} className="text-premium/65 leading-relaxed mb-3" dangerouslySetInnerHTML={{ __html: para }} />
              ))}
            </div>
          ))}
        </div>
        <div className="glass rounded-2xl p-6 mt-12 text-sm text-premium/60">
          <p className="font-semibold text-premium">Grievance Officer & Contact</p>
          <p className="mt-2">For any questions or complaints regarding this policy, contact us at <a href={`mailto:${SITE.email}`} className="text-cyber">{SITE.email}</a> or WhatsApp {SITE.whatsapp}. We respond to grievances within the timelines mandated by applicable Indian law.</p>
          <p className="mt-3 text-premium/40">{SITE.brand}, India · GSTIN: GSTIN-PLACEHOLDER</p>
        </div>
      </Section>
    </>
  )
}
