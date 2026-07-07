import LegalPage from '@/components/legal-page'

export const metadata = { title: 'Terms & Conditions', description: 'Terms and conditions for using flyqdrone.in and purchasing FLYQ products.' }

export default function Terms() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="1 June 2025"
      intro="These Terms & Conditions (&ldquo;Terms&rdquo;) govern your access to and use of this website and the purchase of products and services offered by FLYQ by Passion3D World (&ldquo;FLYQ&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). By accessing this website or placing an order, you agree to be bound by these Terms. These Terms are an electronic record under the Information Technology Act, 2000 and do not require any physical or digital signature."
      sections={[
        { h: 'Eligibility & Account', p: [
          'You must be at least 18 years of age, or accessing the site under the supervision of a parent or legal guardian, to make a purchase. By placing an order you represent that you have the legal capacity to enter into a binding contract under the Indian Contract Act, 1872.',
          'You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. Notify us immediately of any unauthorised use.',
        ]},
        { h: 'Products, Pricing & Availability', p: [
          'All prices are listed in Indian Rupees (INR) and are inclusive or exclusive of GST as indicated at checkout. Prices and product availability are subject to change without notice.',
          'We make reasonable efforts to display product details, specifications and images accurately. Minor variations in colour, finish or appearance may occur. Certain product images are representative.',
          'In the event of a pricing error, we reserve the right to cancel the order and refund any amount paid.',
        ]},
        { h: 'Orders & Acceptance', p: [
          'Your order constitutes an offer to purchase. A contract is formed only when we confirm dispatch. We may, at our discretion, refuse or cancel any order, including for suspected fraud, stock unavailability, or errors in pricing.',
          'Payment must be completed through our approved payment gateways (including Razorpay) or via Cash on Delivery where available.',
        ]},
        { h: 'Shipping & Delivery', p: [
          'Delivery timelines are estimates and not guarantees. Risk of loss passes to you upon delivery. Please refer to our Shipping Policy for full details.',
        ]},
        { h: 'Intellectual Property', p: [
          'All content on this website — including text, graphics, logos, firmware, documentation and the FLYQ name — is the property of FLYQ or its licensors and is protected under the Copyright Act, 1957 and the Trade Marks Act, 1999. Open-source firmware components are licensed separately under their respective open-source licences.',
          'You may not reproduce, distribute or create derivative works from proprietary content without our written permission.',
        ]},
        { h: 'Acceptable Use & Safety', p: [
          'Drones must be operated in compliance with all applicable laws, including the Drone Rules, 2021 and directions of the Directorate General of Civil Aviation (DGCA). You are solely responsible for lawful and safe operation.',
          'You agree not to use our products for any unlawful, hazardous or infringing purpose.',
        ]},
        { h: 'Limitation of Liability', p: [
          'To the maximum extent permitted by law, FLYQ shall not be liable for any indirect, incidental or consequential damages arising from the use or inability to use our products or website. Our total liability shall not exceed the amount paid for the product giving rise to the claim. Nothing in these Terms limits your statutory rights under the Consumer Protection Act, 2019.',
        ]},
        { h: 'Governing Law & Jurisdiction', p: [
          'These Terms are governed by the laws of India. Subject to applicable consumer protection provisions, the courts at Mumbai, Maharashtra shall have exclusive jurisdiction over any disputes.',
        ]},
        { h: 'Changes to these Terms', p: [
          'We may update these Terms from time to time. Continued use of the website after changes constitutes acceptance of the revised Terms.',
        ]},
      ]}
    />
  )
}
