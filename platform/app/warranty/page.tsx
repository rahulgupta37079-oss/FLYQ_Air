import LegalPage from '@/components/legal-page'

export const metadata = { title: 'Warranty Policy', description: 'Manufacturer warranty terms, coverage and claim process for FLYQ products.' }

export default function Warranty() {
  return (
    <LegalPage
      title="Warranty Policy"
      updated="1 June 2025"
      intro="FLYQ products are designed and assembled in India to high engineering standards. This Warranty Policy describes the limited warranty we provide, what it covers, and how to make a claim. This warranty is in addition to, and does not affect, your statutory rights under the Consumer Protection Act, 2019."
      sections={[
        { h: 'Warranty Period', p: [
          'Unless stated otherwise on the product page, FLYQ drones and flight controllers carry a 12-month limited manufacturer warranty from the date of delivery. Accessories and spare parts carry a 3-month warranty. Batteries (LiPo) are covered for manufacturing defects for 1 month.',
        ]},
        { h: 'What Is Covered', p: [
          'The warranty covers defects in materials and workmanship under normal, intended use. If a covered defect arises, we will, at our discretion, repair the product, replace the defective component, or replace the product.',
        ]},
        { h: 'What Is Not Covered', p: [
          'The warranty does not cover damage from crashes, misuse, accidents, water ingress, unauthorised modifications, use of incompatible parts, normal wear and tear (propellers, motors subject to crash damage), or failure to follow operating and safety instructions.',
          'Damage arising from operation contrary to the Drone Rules, 2021 or DGCA directions is not covered.',
          'Consumables and cosmetic wear are excluded.',
        ]},
        { h: 'How to Claim', p: [
          'Raise a warranty claim by initiating an RMA from your account dashboard or contacting support with your order number, a description of the issue, and supporting photos or video. Our team will diagnose remotely where possible.',
        ]},
        { h: 'Assessment & Turnaround', p: [
          'Approved claims are serviced at our facility. Typical turnaround is 7–10 business days after we receive the product, subject to parts availability. We will keep you informed throughout.',
        ]},
        { h: 'Shipping for Warranty Service', p: [
          'For valid in-warranty claims due to a manufacturing defect, we cover reasonable two-way shipping. If, on inspection, the issue is found to be outside warranty, applicable repair and shipping charges will be quoted for your approval.',
        ]},
        { h: 'Open-Source Firmware', p: [
          'Our firmware is open source. Modifying firmware is encouraged for learning, but issues arising directly from user-modified firmware are not covered under hardware warranty. Hardware defects remain covered regardless of firmware changes.',
        ]},
        { h: 'Limitation', p: [
          'This is a limited warranty. To the extent permitted by law, FLYQ disclaims liability for indirect or consequential damages. This warranty does not limit your non-excludable rights as a consumer under Indian law.',
        ]},
      ]}
    />
  )
}
