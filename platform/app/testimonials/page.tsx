import { PageHero, Section } from '@/components/ui/section'
import TestimonialWall from '@/components/sections/testimonial-wall'

export const metadata = { title: 'Testimonials', description: 'Real WhatsApp conversations from FLYQ customers across India.' }

export default function TestimonialsPage() {
  return (
    <>
      <PageHero eyebrow="Real Conversations" title={<>Words from <span className="grad-cyber">our pilots</span></>} sub="Authentic messages from farmers, students, educators, FPV pilots, researchers, dealers and more." />
      <Section className="py-12"><TestimonialWall /></Section>
    </>
  )
}
