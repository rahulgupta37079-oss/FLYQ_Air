import LegalPage from '@/components/legal-page'

export const metadata = { title: 'Refund & Cancellation Policy', description: 'Cancellation, return and refund policy for FLYQ orders, compliant with the Consumer Protection Act, 2019.' }

export default function Refund() {
  return (
    <LegalPage
      title="Refund & Cancellation Policy"
      updated="1 June 2025"
      intro="This policy sets out the terms under which you may cancel an order, return a product and claim a refund. It is framed in accordance with the Consumer Protection Act, 2019 and the Consumer Protection (E-Commerce) Rules, 2020."
      sections={[
        { h: 'Order Cancellation', p: [
          'You may cancel an order free of charge any time before it is dispatched. To cancel, log in to your account or contact us with your order number.',
          'Once an order has been dispatched, it cannot be cancelled but may be eligible for return as set out below.',
        ]},
        { h: 'Returns & Eligibility', p: [
          'You may request a return within 7 days of delivery for products that are defective, damaged in transit, or materially different from what was ordered.',
          'To be eligible, the product must be unused, in its original condition and packaging, with all accessories, manuals and the contents of &ldquo;In the box&rdquo; included.',
          'Certain items are non-returnable for safety and hygiene reasons, including consumable parts, opened batteries (LiPo), and custom or made-to-order products — unless they are defective.',
        ]},
        { h: 'How to Initiate a Return (RMA)', p: [
          'Raise a Return Merchandise Authorisation (RMA) from your account dashboard or by contacting support with photos/video of the issue. We will arrange a reverse pickup where serviceable, or provide a drop-off option.',
        ]},
        { h: 'Inspection & Approval', p: [
          'Returned products are inspected on receipt. Approved returns proceed to refund or replacement. If a return is rejected (e.g. signs of misuse or missing items), the product will be shipped back to you and no refund issued.',
        ]},
        { h: 'Refund Method & Timeline', p: [
          'Approved refunds are processed to the original payment method within 5–7 business days of approval. Bank or gateway processing times may add a few additional days.',
          'For Cash on Delivery orders, refunds are made via bank transfer (NEFT/UPI) to the account details you provide.',
          'Shipping charges, if any, are non-refundable except where the return is due to our error or a defective product.',
        ]},
        { h: 'Replacements & Warranty', p: [
          'For defective products within the warranty period, you may opt for a replacement or repair as per our Warranty Policy. Where a replacement is unavailable, we will issue a refund.',
        ]},
        { h: 'Damaged or Wrong Items', p: [
          'If you receive a damaged or incorrect item, notify us within 48 hours of delivery with supporting photos so we can resolve it promptly at no cost to you.',
        ]},
        { h: 'Grievance Redressal', p: [
          'If you are not satisfied with the resolution, you may escalate to our Grievance Officer. We aim to acknowledge complaints within 48 hours and resolve them within the timelines prescribed under the Consumer Protection (E-Commerce) Rules, 2020.',
        ]},
      ]}
    />
  )
}
