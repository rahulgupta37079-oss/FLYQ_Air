import { PageHero, Section, Eyebrow } from '@/components/ui/section'

export const metadata = { title: 'Curriculum', description: '8-week FLYQ drone programming curriculum with downloadable syllabus.' }

const WEEKS = [
  ['Week 1', 'Drone anatomy, safety & first flight', 'Assembly, controls, flight modes'],
  ['Week 2', 'Block coding basics', 'Drag-and-drop missions, takeoff/land logic'],
  ['Week 3', 'Sensors & telemetry', 'IMU, barometer, optical flow data'],
  ['Week 4', 'Intro to Python SDK', 'Scripting flight paths & loops'],
  ['Week 5', 'PID & stabilization', 'Tuning, control loops, intuition'],
  ['Week 6', 'Computer vision', 'Markers, tracking, basic CV pipelines'],
  ['Week 7', 'Autonomy & waypoints', 'GPS-less indoor navigation'],
  ['Week 8', 'Capstone project', 'Design, build & demo an autonomous mission'],
]

export default function Curriculum() {
  return (
    <>
      <PageHero eyebrow="8-Week Course" title={<>From zero to <span className="grad-cyber">autonomous flight</span></>} sub="A structured, project-based path used in classrooms across India." />
      <Section className="pb-8 text-center">
        <a href="#" className="px-7 py-3.5 rounded-xl btn-cyber font-bold inline-block">Download Syllabus (PDF)</a>
      </Section>
      <Section className="py-12">
        <div className="space-y-4 max-w-4xl mx-auto">
          {WEEKS.map(([w, t, d], i) => (
            <div key={w} className="glass rounded-2xl p-6 flex gap-5 card-hover">
              <div className="w-14 h-14 rounded-xl btn-cyber grid place-items-center font-extrabold text-ink shrink-0">{i + 1}</div>
              <div>
                <div className="text-xs text-cyber font-mono">{w}</div>
                <h3 className="font-bold">{t}</h3>
                <p className="text-premium/55 text-sm mt-1">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section className="py-8">
        <div className="glass rounded-2xl p-8 text-center">
          <Eyebrow>Also available</Eyebrow>
          <p className="mt-4 text-premium/70">16-week extended track and a Teacher CPD (train-the-trainer) certification — included in STEM Lab Pro & Enterprise tiers.</p>
        </div>
      </Section>
    </>
  )
}
