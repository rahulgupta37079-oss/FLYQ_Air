import LegalPage from '@/components/legal-page'

export const metadata = { title: 'Shipping Policy', description: 'Shipping coverage, timelines, charges and tracking for FLYQ orders across India.' }

export default function Shipping() {
  return (
    <LegalPage
      title="Shipping Policy"
      updated="1 June 2025"
      intro="This Shipping Policy explains how we process, pack and deliver your FLYQ orders. We ship across India through reputed logistics partners, including Shiprocket-aggregated couriers."
      sections={[
        { h: 'Coverage', p: [
          'We currently ship to serviceable PIN codes across India. Serviceability is checked at checkout. For international or remote-area requirements, please contact us before ordering.',
        ]},
        { h: 'Processing Time', p: [
          'In-stock orders are typically processed and dispatched within 1–3 business days. Custom, bulk or made-to-order items may require additional lead time, which will be communicated at the time of order.',
        ]},
        { h: 'Delivery Timelines', p: [
          'Estimated delivery is 3–7 business days for metro and Tier-1 cities, and 5–10 business days for other locations, after dispatch. These are estimates and may vary due to courier, weather, festivals or force-majeure events.',
        ]},
        { h: 'Shipping Charges', p: [
          'Shipping is free on prepaid orders above ₹5,000. Below this threshold, a nominal shipping fee is calculated at checkout based on weight and destination. Cash on Delivery orders may attract an additional handling fee where applicable.',
        ]},
        { h: 'Tracking', p: [
          'Once dispatched, you will receive a tracking link by email and/or WhatsApp. You can also track your order from your account dashboard or the order-tracking page.',
        ]},
        { h: 'Packaging & Hazmat', p: [
          'Drones, batteries (LiPo) and electronics are packed to safety standards. Battery shipments comply with applicable transport regulations and may be routed via surface logistics where air transport is restricted.',
        ]},
        { h: 'Delivery Attempts & Failures', p: [
          'Couriers typically make multiple delivery attempts. Please ensure someone is available at the address and that contact details are accurate. Orders returned to us due to incorrect address or repeated failed attempts may incur re-shipping charges.',
        ]},
        { h: 'Damaged or Lost Shipments', p: [
          'If a package arrives damaged, refuse delivery where possible or notify us within 48 hours with photos. For shipments lost in transit, we will investigate with the courier and arrange a replacement or refund as appropriate.',
        ]},
      ]}
    />
  )
}
