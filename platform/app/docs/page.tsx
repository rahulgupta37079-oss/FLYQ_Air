import { PageHero, Section } from '@/components/ui/section'
import { Cpu, Code2, Terminal, GitBranch, BookOpen, Box } from 'lucide-react'

export const metadata = { title: 'Developer Docs', description: 'ESP-IDF, Arduino and Python SDK documentation for FLYQ.' }

const HUBS = [
  { icon: Cpu, h: 'ESP-IDF', s: 'Low-level firmware, FreeRTOS tasks, peripheral drivers.' },
  { icon: Code2, h: 'Arduino', s: 'Beginner-friendly sketches and libraries.' },
  { icon: Terminal, h: 'Python SDK', s: 'High-level flight control & autonomous missions.' },
  { icon: Box, h: 'Hardware', s: 'Schematics, pinout, 24-pin expansion connector.' },
  { icon: BookOpen, h: 'Tutorials', s: 'Step-by-step guides from first flight to CV.' },
  { icon: GitBranch, h: 'Crazyflie Client', s: 'Use the open Crazyflie ecosystem tooling.' },
]

export default function Docs() {
  return (
    <>
      <PageHero eyebrow="Developer Documentation" title={<>Build on <span className="grad-cyber">open hardware</span></>} sub="100% open-source. Software under MIT, hardware under CERN-OHL." />
      <Section className="py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {HUBS.map(d => (
            <a key={d.h} href="#" className="glass rounded-2xl p-7 card-hover group">
              <span className="w-12 h-12 rounded-xl bg-cyber/10 grid place-items-center text-cyber group-hover:shadow-cyber transition"><d.icon size={22} /></span>
              <h3 className="font-bold mt-4">{d.h}</h3>
              <p className="text-premium/55 text-sm mt-1">{d.s}</p>
            </a>
          ))}
        </div>
      </Section>
      <Section className="py-8">
        <div className="glass rounded-2xl p-8">
          <h2 className="font-bold text-lg mb-4">Firmware releases</h2>
          <p className="text-premium/55 text-sm">Latest releases auto-pull from the GitHub release feed once the repo is connected. Subscribe to the newsletter to get firmware drop notifications.</p>
          <div className="mt-4 space-y-2 font-mono text-sm text-premium/60">
            <div className="flex justify-between border-b border-border pb-2"><span>v1.4.0 · stability + CV pipeline</span><span className="text-cyber">latest</span></div>
            <div className="flex justify-between border-b border-border pb-2"><span>v1.3.2 · optical-flow tuning</span><span>stable</span></div>
            <div className="flex justify-between"><span>v1.3.0 · Python SDK 2.0</span><span>stable</span></div>
          </div>
        </div>
      </Section>
    </>
  )
}
