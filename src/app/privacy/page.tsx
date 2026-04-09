import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — MissedCallAI',
  alternates: { canonical: 'https://missedcallai.co.uk/privacy' },
}

export default function PrivacyPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="font-display font-black uppercase text-4xl mb-2">
        Privacy <span style={{ color: 'var(--color-accent)' }}>Policy</span>
      </h1>
      <p className="text-sm mb-12" style={{ color: 'var(--color-muted)' }}>
        Last updated: 10 April 2026
      </p>

      <div className="space-y-10 text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>

        <section>
          <h2 className="font-display font-black uppercase text-xl mb-3" style={{ color: 'var(--color-text)' }}>
            1. Who we are
          </h2>
          <p>
            MissedCallAI is operated by Rijas Panthayil Baby Suresh, trading as MissedCallAI,
            of G/1 - 7 Townhead Terrace, Paisley, PA1 2AU, United Kingdom
            (<strong style={{ color: 'var(--color-text)' }}>"we", "us", "our"</strong>).
          </p>
          <p className="mt-3">
            We are the data controller for personal data collected through this service.
            You can contact us at{' '}
            <a href="mailto:rijas@missedcallai.co.uk" style={{ color: 'var(--color-accent)' }}>
              rijas@missedcallai.co.uk
            </a>.
          </p>
        </section>

        <section>
          <h2 className="font-display font-black uppercase text-xl mb-3" style={{ color: 'var(--color-text)' }}>
            2. What data we collect
          </h2>
          <p className="mb-3">We collect and process the following personal data:</p>
          <div className="space-y-3">
            {[
              { label: 'Account data', detail: 'Your mobile phone number, business name, owner name, email address, and services description, collected when you sign up and complete onboarding.' },
              { label: 'Payment data', detail: 'Your payment card details and billing information, processed directly by Stripe. We do not store card numbers — only your Stripe customer and subscription IDs.' },
              { label: 'Call data', detail: 'Records of calls handled by our AI assistant on your behalf, including caller phone numbers, call summaries, call duration, and call recordings. Callers are informed at the start of each call that it may be recorded.' },
              { label: 'Usage data', detail: 'Technical data such as pages visited and actions taken, collected via Vercel Analytics.' },
            ].map(({ label, detail }) => (
              <div key={label} className="pl-4 border-l-2" style={{ borderColor: 'var(--color-border-2)' }}>
                <p className="font-semibold mb-1" style={{ color: 'var(--color-text)' }}>{label}</p>
                <p>{detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display font-black uppercase text-xl mb-3" style={{ color: 'var(--color-text)' }}>
            3. How we use your data
          </h2>
          <div className="space-y-3">
            {[
              { purpose: 'Providing the service', basis: 'Contract', detail: 'Processing your account details, provisioning your dedicated phone number, and operating the AI call handling service.' },
              { purpose: 'Processing payments', basis: 'Contract', detail: 'Managing your subscription, trial period, and billing via Stripe.' },
              { purpose: 'Sending notifications', basis: 'Contract', detail: 'Sending you SMS and email alerts when a missed call is handled by our AI.' },
              { purpose: 'Service improvement', basis: 'Legitimate interest', detail: 'Analysing call summaries and anonymised usage data to improve our AI assistant and service quality.' },
              { purpose: 'Legal compliance', basis: 'Legal obligation', detail: 'Retaining records as required by applicable law.' },
            ].map(({ purpose, basis, detail }) => (
              <div key={purpose} className="pl-4 border-l-2" style={{ borderColor: 'var(--color-border-2)' }}>
                <p className="font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
                  {purpose}{' '}
                  <span className="text-xs font-normal" style={{ color: 'var(--color-accent)' }}>
                    — {basis}
                  </span>
                </p>
                <p>{detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display font-black uppercase text-xl mb-3" style={{ color: 'var(--color-text)' }}>
            4. Sub-processors
          </h2>
          <p className="mb-4">
            We share your data with the following third-party processors to deliver our service.
            All processors are contractually bound to process data only on our instructions and
            in accordance with applicable data protection law.
          </p>
          <div className="space-y-3">
            {[
              { name: 'Supabase', location: 'EU (London)', purpose: 'Database and authentication', link: 'https://supabase.com/privacy' },
              { name: 'Twilio', location: 'USA (SCCs in place)', purpose: 'Phone number provisioning and SMS notifications', link: 'https://www.twilio.com/en-us/legal/privacy' },
              { name: 'Vapi', location: 'USA (SCCs in place)', purpose: 'AI voice assistant and call handling', link: 'https://vapi.ai/privacy' },
              { name: 'Stripe', location: 'USA (SCCs in place)', purpose: 'Payment processing', link: 'https://stripe.com/gb/privacy' },
              { name: 'Vercel', location: 'USA (SCCs in place)', purpose: 'Website hosting and analytics', link: 'https://vercel.com/legal/privacy-policy' },
              { name: 'Resend', location: 'USA (SCCs in place)', purpose: 'Transactional email delivery', link: 'https://resend.com/legal/privacy-policy' },
            ].map(({ name, location, purpose, link }) => (
              <div key={name} className="pl-4 border-l-2" style={{ borderColor: 'var(--color-border-2)' }}>
                <p className="font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
                  {name}{' '}
                  <span className="text-xs font-normal" style={{ color: 'var(--color-muted)' }}>
                    — {location}
                  </span>
                </p>
                <p className="mb-1">{purpose}</p>
                <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)' }} className="text-xs">
                  Privacy policy →
                </a>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display font-black uppercase text-xl mb-3" style={{ color: 'var(--color-text)' }}>
            5. Call recordings
          </h2>
          <p className="mb-3">
            Our AI assistant informs callers at the start of each call that the call may be recorded
            and a summary sent to the business owner. By continuing the call, the caller consents
            to this recording.
          </p>
          <p className="mb-3">
            Call recordings are retained for a maximum of 90 days from the date of the call,
            after which they are permanently deleted. Call summaries and metadata (duration,
            caller number, timestamp) may be retained for up to 12 months for legitimate
            business and service improvement purposes.
          </p>
          <p>
            Caller phone numbers are stored to enable callback functionality. Where a caller
            number cannot be identified, it is recorded as unknown and no personal data is stored.
          </p>
        </section>

        <section>
          <h2 className="font-display font-black uppercase text-xl mb-3" style={{ color: 'var(--color-text)' }}>
            6. Data retention
          </h2>
          <div className="space-y-2">
            {[
              { type: 'Account data', period: 'For the duration of your subscription plus 6 months after cancellation' },
              { type: 'Call recordings', period: '90 days from date of call' },
              { type: 'Call summaries and metadata', period: '12 months from date of call' },
              { type: 'Payment records', period: '7 years (legal requirement)' },
              { type: 'Usage analytics', period: 'Aggregated and anonymised — retained indefinitely' },
            ].map(({ type, period }) => (
              <div key={type} className="flex gap-4 py-2 border-b" style={{ borderColor: 'var(--color-border)' }}>
                <span className="font-semibold w-48 shrink-0" style={{ color: 'var(--color-text)' }}>{type}</span>
                <span>{period}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display font-black uppercase text-xl mb-3" style={{ color: 'var(--color-text)' }}>
            7. Your rights
          </h2>
          <p className="mb-3">Under UK GDPR, you have the following rights:</p>
          <div className="space-y-2">
            {[
              { right: 'Right of access', detail: 'Request a copy of the personal data we hold about you.' },
              { right: 'Right to rectification', detail: 'Request correction of inaccurate personal data.' },
              { right: 'Right to erasure', detail: 'Request deletion of your personal data, subject to legal retention requirements.' },
              { right: 'Right to restriction', detail: 'Request that we limit processing of your data in certain circumstances.' },
              { right: 'Right to portability', detail: 'Request your data in a machine-readable format.' },
              { right: 'Right to object', detail: 'Object to processing based on legitimate interests.' },
            ].map(({ right, detail }) => (
              <div key={right} className="pl-4 border-l-2" style={{ borderColor: 'var(--color-border-2)' }}>
                <p className="font-semibold mb-0.5" style={{ color: 'var(--color-text)' }}>{right}</p>
                <p>{detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-4">
            To exercise any of these rights, contact us at{' '}
            <a href="mailto:rijas@missedcallai.co.uk" style={{ color: 'var(--color-accent)' }}>
              rijas@missedcallai.co.uk
            </a>. We will respond within 30 days.
          </p>
          <p className="mt-3">
            You also have the right to lodge a complaint with the Information Commissioner's Office (ICO)
            at{' '}
            <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)' }}>
              ico.org.uk
            </a>.
          </p>
        </section>

        <section>
          <h2 className="font-display font-black uppercase text-xl mb-3" style={{ color: 'var(--color-text)' }}>
            8. Cookies
          </h2>
          <p>
            We use Vercel Analytics which does not use cookies or collect personally identifiable
            information. Authentication session cookies are strictly necessary for the service to
            function and do not require consent under UK PECR.
          </p>
        </section>

        <section>
          <h2 className="font-display font-black uppercase text-xl mb-3" style={{ color: 'var(--color-text)' }}>
            9. Security
          </h2>
          <p>
            We implement appropriate technical and organisational measures to protect your personal
            data, including encrypted data transmission (TLS), row-level security on our database,
            and access controls limiting who can access personal data. No method of transmission
            over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="font-display font-black uppercase text-xl mb-3" style={{ color: 'var(--color-text)' }}>
            10. Changes to this policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of significant
            changes by email. The date at the top of this page indicates when it was last updated.
            Continued use of the service after changes constitutes acceptance of the updated policy.
          </p>
        </section>

      </div>
    </main>
  )
}