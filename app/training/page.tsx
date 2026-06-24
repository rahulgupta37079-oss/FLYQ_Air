import { PageHero, Section, Eyebrow } from '@/components/ui/section'
import LeadForm from '@/components/forms/lead-form'

export const metadata = { title: 'Training & Certification', description: 'Hands-on drone training — from first flight to programmable autonomy. For students, educators and professionals.' }

const FIELDS = [
  { name: 'name', label: 'Full name', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Phone', type: 'tel', required: true },
  { name: 'city', label: 'City' },
  { name: 'course', label: 'Course of interest', required: true, options: ['Foundations of Drone Flight', 'ESP32-S3 Programming', 'Autonomous Missions & Python SDK', 'FPV Racing & Build', 'Educator Train-the-Trainer', 'Custom / Corporate'] },
  { name: 'preferred_dates', label: 'Preferred dates' },
  { name: 'experience', label: 'Prior experience', options: ['None — complete beginner', 'Hobbyist', 'Built a drone before', 'Professional / commercial'] },
  { name: 'message', label: 'Anything else?', textarea: true },
]

const TRACKS = [
  ['Foundations', 'Beginner', 'Aerodynamics, safety, regulations (DGCA basics), and your first stable flights.'],
  ['Programmable Flight', 'Intermediate', 'Flash and program the ESP32-S3 flight controller. Arduino & ESP-IDF workflows.'],
  ['Autonomous Missions', 'Advanced', 'Waypoints, sensors and the Python SDK. Build repeatable autonomous routines.'],
  ['FPV Build & Race', 'Intermediate', 'Solder, tune and fly FPV. From bench build to first race line.'],
]

const FORMATS = [
  ['On-campus', 'We bring trainers, kits and curriculum to your institution.'],
  ['At our lab', 'Small-batch hands-on sessions in a fully-equipped maker space.'],
  ['Online + kit', 'Live cohorts shipped with a hardware kit for remote learners.'],
]

export default function Training() {
  return (
    <>
      <PageHero eyebrow="Learn to Fly & Build" title={<>Training & <span className="grad-cyber">Certification</span></>} sub="Structured, hands-on programmes that take you from first flight to programmable autonomy — with a FLYQ certificate." />

      <Section className="py-12">
        <Eyebrow>Tracks</Eyebrow>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
          {TRACKS.map(([h, lvl, d]) => (
            <div key={h} className="glass rounded-2xl p-6 card-hover">
              <span className="text-xs text-cyber uppercase tracking-widest font-semibold">{lvl}</span>
              <h3 className="font-bold text-lg mt-2">{h}</h3>
              <p className="text-premium/55 text-sm mt-2 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="py-8">
        <Eyebrow>Formats</Eyebrow>
        <div className="grid sm:grid-cols-3 gap-5 mt-5">
          {FORMATS.map(([h, d]) => (
            <div key={h} className="glass rounded-2xl p-6"><h3 className="font-bold">{h}</h3><p className="text-premium/55 text-sm mt-2">{d}</p></div>
          ))}
        </div>
      </Section>

      <Section className="py-8 grid lg:grid-cols-5 gap-8 items-start">
        <div className="lg:col-span-2 space-y-4">
          <Eyebrow>Enrol</Eyebrow>
          <h2 className="text-2xl font-bold">Reserve your seat</h2>
          <p className="text-premium/55 text-sm leading-relaxed">Tell us your goals and availability. We&rsquo;ll match you to the right cohort and send dates, fees and joining details.</p>
        </div>
        <div className="lg:col-span-3">
          <LeadForm endpoint="/api/leads/training" fields={FIELDS} cta="Enrol now" />
        </div>
      </Section>
    </>
  )
}
