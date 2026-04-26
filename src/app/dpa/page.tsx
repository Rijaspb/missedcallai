import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Data Processing Agreement — MissedCallAI',
  alternates: { canonical: 'https://missedcallai.co.uk/dpa' },
}

export default function DpaPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="font-display font-black uppercase text-4xl mb-2">
        Data Processing <span style={{ color: 'var(--color-accent)' }}>Agreement</span>
      </h1>
      <p className="text-sm mb-12" style={{ color: 'var(--color-muted)' }}>
        Last updated: 26 April 2026 · Governed by UK GDPR Article 28
      </p>

      <div className="space-y-10 text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>

        <section>
          <h2 className="font-display font-black uppercase text-xl mb-3" style={{ color: 'var(--color-text)' }}>
            1. Parties
          </h2>
          <p className="mb-3">
            This Data Processing Agreement (<strong style={{ color: 'var(--color-text)' }}>"DPA"</strong>) is entered into between:
          </p>
          <div className="space-y-3">
            <div className="pl-4 border-l-2" style={{ borderColor: 'var(--color-border-2)' }}>
              <p className="font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Controller</p>
              <p>
                You, the customer, being the individual or business that has signed up to use
                MissedCallAI (<strong style={{ color: 'var(--color-text)' }}>"Controller", "you"</strong>).
              </p>
            </div>
            <div className="pl-4 border-l-2" style={{ borderColor: 'var(--color-border-2)' }}>
              <p className="font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Processor</p>
              <p>
                Rijas Panthayil Baby Suresh, trading as MissedCallAI, of G/1 - 7 Townhead Terrace,
                Paisley, PA1 2AU, United Kingdom
                (<strong style={{ color: 'var(--color-text)' }}>"Processor", "we", "us"</strong>).
                Contact:{' '}
                <a href="mailto:rijas@missedcallai.co.uk" style={{ color: 'var(--color-accent)' }}>
                  rijas@missedcallai.co.uk
                </a>
              </p>
            </div>
          </div>
          <p className="mt-4">
            This DPA forms part of the Terms of Service between you and MissedCallAI and applies
            wherever we process personal data on your behalf. By using the service, you agree to
            the terms of this DPA.
          </p>
        </section>

        <section>
          <h2 className="font-display font-black uppercase text-xl mb-3" style={{ color: 'var(--color-text)' }}>
            2. Definitions
          </h2>
          <div className="space-y-2">
            {[
              { term: 'UK GDPR', def: 'The UK General Data Protection Regulation as retained in UK law by the European Union (Withdrawal) Act 2018, together with the Data Protection Act 2018.' },
              { term: 'Personal data', def: 'Any information relating to an identified or identifiable natural person, as defined in UK GDPR Article 4(1).' },
              { term: 'Processing', def: 'Any operation performed on personal data, including collection, recording, storage, retrieval, use, disclosure, or deletion.' },
              { term: 'Data subject', def: 'An individual whose personal data is processed — in this context, callers who contact your business number.' },
              { term: 'Sub-processor', def: 'A third party engaged by the Processor to carry out processing activities on behalf of the Controller.' },
            ].map(({ term, def }) => (
              <div key={term} className="pl-4 border-l-2 py-1" style={{ borderColor: 'var(--color-border-2)' }}>
                <p className="font-semibold mb-0.5" style={{ color: 'var(--color-text)' }}>{term}</p>
                <p>{def}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display font-black uppercase text-xl mb-3" style={{ color: 'var(--color-text)' }}>
            3. Details of processing
          </h2>
          <div className="space-y-3">
            {[
              { label: 'Subject matter', detail: 'The operation of an AI-powered missed call handling service on behalf of UK tradespeople.' },
              { label: 'Duration', detail: 'For the duration of your active subscription, plus any retention periods specified in section 6 of this DPA.' },
              { label: 'Nature of processing', detail: 'Receiving inbound telephone calls, generating AI voice responses, recording calls, producing call summaries, and transmitting SMS notifications to you.' },
              { label: 'Purpose', detail: 'To answer missed calls on your behalf, collect caller enquiries, and notify you with a summary — enabling you to follow up with potential customers.' },
              { label: 'Categories of personal data', detail: 'Caller phone numbers, voice recordings, call summaries (which may contain names, addresses, job descriptions, or other information disclosed by callers), and call metadata (timestamp, duration).' },
              { label: 'Categories of data subjects', detail: 'Members of the public who telephone your business number and are connected to the MissedCallAI service.' },
            ].map(({ label, detail }) => (
              <div key={label} className="flex gap-4 py-2 border-b" style={{ borderColor: 'var(--color-border)' }}>
                <span className="font-semibold w-40 shrink-0" style={{ color: 'var(--color-text)' }}>{label}</span>
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display font-black uppercase text-xl mb-3" style={{ color: 'var(--color-text)' }}>
            4. Processor obligations
          </h2>
          <p className="mb-3">
            In accordance with UK GDPR Article 28, we agree to the following obligations:
          </p>
          <div className="space-y-3">
            {[
              { title: 'Process only on instructions', detail: 'We will process personal data only on your documented instructions, including as set out in this DPA and our Terms of Service. We will inform you if we believe an instruction infringes UK GDPR.' },
              { title: 'Confidentiality', detail: 'We will ensure that all personnel authorised to process personal data are bound by appropriate obligations of confidentiality.' },
              { title: 'Security', detail: 'We will implement appropriate technical and organisational measures to protect personal data against accidental or unlawful destruction, loss, alteration, or unauthorised disclosure, including encrypted data transmission (TLS) and row-level security on our database.' },
              { title: 'Sub-processors', detail: 'We will not engage new sub-processors without informing you. Our current sub-processors are listed in section 5. By accepting this DPA, you grant general authorisation for the use of those sub-processors.' },
              { title: 'Data subject rights', detail: 'We will assist you, where reasonably possible and given the nature of the processing, to fulfil your obligations to respond to data subject rights requests under UK GDPR.' },
              { title: 'Breach notification', detail: 'We will notify you without undue delay upon becoming aware of a personal data breach affecting data we process on your behalf, to enable you to meet your notification obligations under UK GDPR Article 33.' },
              { title: 'Data protection impact assessments', detail: 'We will provide reasonable assistance to you in carrying out data protection impact assessments where required under UK GDPR Article 35.' },
              { title: 'Deletion or return', detail: 'Upon termination of the service, we will delete all personal data processed on your behalf within 90 days, unless we are required to retain it by applicable law.' },
              { title: 'Audit', detail: 'We will make available all information reasonably necessary to demonstrate compliance with this DPA and permit audits conducted by you or your authorised representative, on reasonable notice and at your cost.' },
            ].map(({ title, detail }) => (
              <div key={title} className="pl-4 border-l-2" style={{ borderColor: 'var(--color-border-2)' }}>
                <p className="font-semibold mb-1" style={{ color: 'var(--color-text)' }}>{title}</p>
                <p>{detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display font-black uppercase text-xl mb-3" style={{ color: 'var(--color-text)' }}>
            5. Sub-processors
          </h2>
          <p className="mb-4">
            You authorise us to engage the following sub-processors. Each is bound by contractual
            data protection obligations no less protective than those in this DPA. Where sub-processors
            are located outside the UK, transfers are made under appropriate safeguards (Standard
            Contractual Clauses or equivalent UK IDTA mechanisms).
          </p>
          <div className="space-y-3">
            {[
              { name: 'Supabase', location: 'UK/EU region', purpose: 'Database storage and authentication', transfers: 'No international transfer — EU/UK region only', link: 'https://supabase.com/privacy' },
              { name: 'Twilio', location: 'USA', purpose: 'Phone number provisioning, call routing, SMS delivery', transfers: 'UK → USA under SCCs', link: 'https://www.twilio.com/en-us/legal/privacy' },
              { name: 'Vapi', location: 'USA', purpose: 'AI voice assistant, call handling, call recordings', transfers: 'UK → USA under SCCs', link: 'https://vapi.ai/privacy' },
              { name: 'Stripe', location: 'USA', purpose: 'Payment processing and subscription management', transfers: 'UK → USA under SCCs', link: 'https://stripe.com/gb/privacy' },
              { name: 'Vercel', location: 'USA', purpose: 'Application hosting', transfers: 'UK → USA under SCCs', link: 'https://vercel.com/legal/privacy-policy' },
              { name: 'Resend', location: 'USA', purpose: 'Transactional email delivery', transfers: 'UK → USA under SCCs', link: 'https://resend.com/legal/privacy-policy' },
            ].map(({ name, location, purpose, transfers, link }) => (
              <div key={name} className="pl-4 border-l-2" style={{ borderColor: 'var(--color-border-2)' }}>
                <p className="font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
                  {name}{' '}
                  <span className="text-xs font-normal" style={{ color: 'var(--color-muted)' }}>
                    — {location}
                  </span>
                </p>
                <p className="mb-0.5">{purpose}</p>
                <p className="mb-1 text-xs">{transfers}</p>
                <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)' }} className="text-xs">
                  Privacy policy →
                </a>
              </div>
            ))}
          </div>
          <p className="mt-4">
            We will provide at least 14 days' notice before engaging any new sub-processor.
            You may object to a new sub-processor within that period by contacting us at{' '}
            <a href="mailto:rijas@missedcallai.co.uk" style={{ color: 'var(--color-accent)' }}>
              rijas@missedcallai.co.uk
            </a>.
            If you object and we cannot accommodate your objection, you may terminate your
            subscription without penalty.
          </p>
        </section>

        <section>
          <h2 className="font-display font-black uppercase text-xl mb-3" style={{ color: 'var(--color-text)' }}>
            6. Retention and deletion
          </h2>
          <div className="space-y-2">
            {[
              { type: 'Call recordings', period: 'Deleted 90 days after the date of the call' },
              { type: 'Call summaries and metadata', period: 'Deleted 12 months after the date of the call' },
              { type: 'Account data', period: 'Deleted within 90 days of subscription termination' },
              { type: 'Payment records', period: 'Retained for 7 years to comply with UK financial regulations' },
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
            7. Controller obligations
          </h2>
          <p className="mb-3">As the Controller, you agree to:</p>
          <ul className="space-y-2 list-none">
            {[
              'Ensure you have a lawful basis for processing caller personal data through the MissedCallAI service.',
              'Ensure callers are made aware that their calls may be answered by an AI assistant and that calls may be recorded — the MissedCallAI system provides an automated disclosure at the start of each call, which satisfies this requirement.',
              'Not instruct us to process personal data in a manner that would breach UK GDPR or any other applicable law.',
              'Promptly inform us of any data subject rights requests relating to data we process on your behalf.',
              'Ensure your use of call summary data and recordings complies with applicable data protection law.',
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span style={{ color: 'var(--color-accent)' }}>—</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display font-black uppercase text-xl mb-3" style={{ color: 'var(--color-text)' }}>
            8. International transfers
          </h2>
          <p className="mb-3">
            Some of our sub-processors are located in the United States. Where personal data
            is transferred outside the UK, we ensure appropriate safeguards are in place in
            accordance with UK GDPR Chapter V, including Standard Contractual Clauses (SCCs)
            approved under the UK International Data Transfer Agreement (IDTA) framework.
          </p>
          <p>
            By using MissedCallAI, you acknowledge and agree to these international transfers
            as necessary for the delivery of the service.
          </p>
        </section>

        <section>
          <h2 className="font-display font-black uppercase text-xl mb-3" style={{ color: 'var(--color-text)' }}>
            9. Liability
          </h2>
          <p className="mb-3">
            Each party shall be liable for damages caused by processing that infringes UK GDPR
            where it has failed to comply with its obligations under this DPA or applicable law.
            The Processor shall not be liable for damages caused by processing carried out on
            the Controller's instructions where those instructions were unlawful.
          </p>
          <p>
            Our total liability under this DPA is subject to the limitation of liability clause
            in our Terms of Service.
          </p>
        </section>

        <section>
          <h2 className="font-display font-black uppercase text-xl mb-3" style={{ color: 'var(--color-text)' }}>
            10. Governing law
          </h2>
          <p>
            This DPA is governed by the laws of Scotland and is subject to the
            jurisdiction of the courts of Scotland. It supplements and forms part
            of the Terms of Service. In the event of any conflict between this DPA and the
            Terms of Service on matters of data protection, this DPA shall prevail.
          </p>
        </section>

        <section>
          <h2 className="font-display font-black uppercase text-xl mb-3" style={{ color: 'var(--color-text)' }}>
            11. Contact
          </h2>
          <p>
            For any questions about this DPA or to exercise your rights, contact us at{' '}
            <a href="mailto:rijas@missedcallai.co.uk" style={{ color: 'var(--color-accent)' }}>
              rijas@missedcallai.co.uk
            </a>.
            You also have the right to lodge a complaint with the Information Commissioner's Office
            at{' '}
            <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)' }}>
              ico.org.uk
            </a>.
          </p>
        </section>

      </div>
    </main>
  )
}