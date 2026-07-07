import LegalPage from '@/components/legal-page'

export const metadata = { title: 'Privacy Policy', description: 'How FLYQ collects, uses and protects your personal data under the DPDP Act, 2023.' }

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="1 June 2025"
      intro="This Privacy Policy explains how FLYQ by Passion3D World (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses, stores and protects your personal data. We are committed to processing your data in accordance with the Digital Personal Data Protection Act, 2023 (DPDP Act) and the Information Technology Act, 2000 along with the SPDI Rules, 2011."
      sections={[
        { h: 'Data We Collect', p: [
          'We collect data you provide directly — name, email, phone number, shipping and billing address, and order details. For workshops and leads, we may collect age, occupation, organisation and preferences.',
          'We automatically collect technical data such as IP address, device and browser type, and usage analytics through cookies and similar technologies.',
          'We do not knowingly collect payment card details — payments are processed by PCI-DSS compliant gateways (e.g. Razorpay).',
        ]},
        { h: 'Purpose of Processing', p: [
          'We process your data to fulfil orders, provide customer support, send transactional communications, register you for workshops, respond to enquiries, improve our services, and meet legal obligations. We rely on your consent, the performance of a contract, and our legitimate interests as lawful bases under the DPDP Act.',
        ]},
        { h: 'Consent & Your Rights', p: [
          'Where we rely on consent, you may withdraw it at any time. As a Data Principal under the DPDP Act, you have the right to access, correct, update and erase your personal data, to nominate, and to grievance redressal.',
          'To exercise these rights, contact our Grievance Officer using the details below.',
        ]},
        { h: 'Sharing & Disclosure', p: [
          'We share data only with trusted processors necessary to deliver our services — payment gateways, logistics partners (e.g. Shiprocket), email providers (e.g. Resend) and messaging providers (WhatsApp Cloud API). These parties are bound to process data only on our instructions.',
          'We may disclose data where required by law, court order, or to protect our rights and the safety of others.',
        ]},
        { h: 'Data Retention', p: [
          'We retain personal data only as long as necessary for the purposes described, or as required by tax, accounting and other legal obligations. When no longer required, data is securely deleted or anonymised.',
        ]},
        { h: 'Data Security', p: [
          'We implement reasonable security practices including encryption in transit (HTTPS), access controls, and role-based permissions. While we strive to protect your data, no method of transmission over the internet is fully secure.',
        ]},
        { h: 'Cookies', p: [
          'We use essential cookies for site functionality and optional analytics cookies to understand usage. You can control cookies through your browser settings.',
        ]},
        { h: 'Children', p: [
          'For users below 18, we process data only with verifiable parental or guardian consent in line with the DPDP Act. STEM programmes for minors are administered through their institutions or guardians.',
        ]},
        { h: 'International Transfers', p: [
          'Some service providers may process data outside India. Where this occurs, we ensure appropriate safeguards consistent with applicable law.',
        ]},
        { h: 'Updates', p: [
          'We may revise this Policy periodically. The &ldquo;Last updated&rdquo; date reflects the latest version.',
        ]},
      ]}
    />
  )
}
