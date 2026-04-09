import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — MissedCallAI',
  alternates: { canonical: 'https://missedcallai.co.uk/terms' },
}

export default function TermsPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="font-display font-black uppercase text-4xl mb-2">
        Terms of <span style={{ color: 'var(--color-accent)' }}>Service</span>
      </h1>
      <p className="text-sm mb-12" style={{ color: 'var(--color-muted)' }}>
        Last updated: 10 April 2026
      </p>

      <div className="space-y-10 text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>

        <section>
          <h2 className="font-display font-black uppercase text-xl mb-3" style={{ color: 'var(--color-text)' }}>
            1. About us
          </h2>
          <p>
            MissedCallAI is operated by Rijas Panthayil Baby Suresh, trading as MissedCallAI,
            of G/1 - 7 Townhead Terrace, Paisley, PA1 2AU, United Kingdom.
            Contact:{' '}
            <a href="mailto:rijas@missedcallai.co.uk" style={{ color: 'var(--color-accent)' }}>
              rijas@missedcallai.co.uk
            </a>
          </p>
        </section>

        <section>
          <h2 className="font-display font-black uppercase text-xl mb-3" style={{ color: 'var(--color-text)' }}>
            2. The service
          </h2>
          <p className="mb-3">
            MissedCallAI provides an AI-powered missed call handling service for UK tradespeople.
            When your customer calls your business number and you do not answer, calls are
            automatically forwarded to your dedicated MissedCallAI number, where our AI assistant
            answers, collects the caller's details and enquiry, and sends you an SMS summary.
          </p>
          <p>
            The service requires you to set up call forwarding on your own phone or business line.
            We provide instructions to assist with this but are not responsible for your network
            provider's call forwarding functionality or charges.
          </p>
        </section>

        <section>
          <h2 className="font-display font-black uppercase text-xl mb-3" style={{ color: 'var(--color-text)' }}>
            3. Eligibility
          </h2>
          <p>
            You must be at least 18 years old and based in the United Kingdom to use MissedCallAI.
            By signing up, you confirm that the information you provide is accurate and that you
            are authorised to enter into this agreement.
          </p>
        </section>

        <section>
          <h2 className="font-display font-black uppercase text-xl mb-3" style={{ color: 'var(--color-text)' }}>
            4. Free trial
          </h2>
          <p className="mb-3">
            New customers receive a 14-day free trial. No payment is taken during the trial period.
            You must provide valid payment details to start your trial. If you do not cancel before
            the trial ends, your subscription will automatically begin and your payment method
            will be charged.
          </p>
          <p>
            We reserve the right to modify or withdraw the free trial offer at any time for new
            sign-ups. Existing trials will not be affected.
          </p>
        </section>

        <section>
          <h2 className="font-display font-black uppercase text-xl mb-3" style={{ color: 'var(--color-text)' }}>
            5. Pricing and billing
          </h2>
          <p className="mb-3">
            The current subscription price is £49 per month (inclusive of VAT where applicable).
            Billing occurs monthly on the anniversary of your subscription start date.
          </p>
          <p className="mb-3">
            We reserve the right to change our pricing at any time. We will give you at least
            30 days' notice of any price increase by email. Continued use of the service after
            a price change constitutes acceptance of the new price.
          </p>
          <p>
            All payments are processed securely by Stripe. We do not store your card details.
          </p>
        </section>

        <section>
          <h2 className="font-display font-black uppercase text-xl mb-3" style={{ color: 'var(--color-text)' }}>
            6. Refund policy
          </h2>
          <p className="mb-3">
            We do not offer refunds on subscription payments once the free trial has ended and
            the subscription has commenced, except where required by applicable UK consumer law.
          </p>
          <p className="mb-3">
            If the service has been materially unavailable for an extended period due to our fault,
            you may be entitled to a pro-rata credit at our discretion. To request this, contact
            us at{' '}
            <a href="mailto:rijas@missedcallai.co.uk" style={{ color: 'var(--color-accent)' }}>
              rijas@missedcallai.co.uk
            </a>{' '}
            within 14 days of the issue.
          </p>
          <p>
            We strongly encourage you to use the full 14-day free trial to evaluate the service
            before your subscription begins.
          </p>
        </section>

        <section>
          <h2 className="font-display font-black uppercase text-xl mb-3" style={{ color: 'var(--color-text)' }}>
            7. Cancellation
          </h2>
          <p className="mb-3">
            You may cancel your subscription at any time. Upon cancellation, your service will
            remain active until the end of your current billing period, after which it will
            terminate and your dedicated phone number will be released.
          </p>
          <p>
            To cancel, contact us at{' '}
            <a href="mailto:rijas@missedcallai.co.uk" style={{ color: 'var(--color-accent)' }}>
              rijas@missedcallai.co.uk
            </a>.
            We will add a self-service cancellation option to your dashboard in a future update.
          </p>
        </section>

        <section>
          <h2 className="font-display font-black uppercase text-xl mb-3" style={{ color: 'var(--color-text)' }}>
            8. Acceptable use
          </h2>
          <p className="mb-3">You agree not to use MissedCallAI to:</p>
          <ul className="space-y-2 list-none">
            {[
              'Handle calls on behalf of businesses operating in illegal industries',
              'Deceive callers about the nature of the AI assistant in a harmful or fraudulent way',
              'Circumvent the call recording consent notice provided to callers',
              'Resell or sublicence the service to third parties without our written consent',
              'Attempt to reverse engineer, hack, or disrupt our systems',
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span style={{ color: 'var(--color-accent)' }}>—</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-3">
            We reserve the right to suspend or terminate accounts that violate these terms
            without notice and without refund.
          </p>
        </section>

        <section>
          <h2 className="font-display font-black uppercase text-xl mb-3" style={{ color: 'var(--color-text)' }}>
            9. Service availability
          </h2>
          <p className="mb-3">
            We aim to provide a reliable service but do not guarantee 100% uptime. The service
            depends on third-party providers including Twilio, Vapi, and Supabase, whose
            availability is outside our control.
          </p>
          <p>
            We will endeavour to notify you of planned maintenance where possible. We are not
            liable for losses arising from service interruptions caused by third-party providers,
            network issues, or circumstances beyond our reasonable control.
          </p>
        </section>

        <section>
          <h2 className="font-display font-black uppercase text-xl mb-3" style={{ color: 'var(--color-text)' }}>
            10. Limitation of liability
          </h2>
          <p className="mb-3">
            To the fullest extent permitted by UK law, our total liability to you for any claim
            arising from your use of MissedCallAI shall not exceed the total subscription fees
            paid by you in the 3 months preceding the claim.
          </p>
          <p className="mb-3">
            We are not liable for any indirect, consequential, or lost business losses, including
            missed jobs or contracts resulting from calls not being handled correctly by the AI
            assistant.
          </p>
          <p>
            Nothing in these terms excludes liability for death or personal injury caused by
            negligence, fraud, or any other liability that cannot be excluded by law.
          </p>
        </section>

        <section>
          <h2 className="font-display font-black uppercase text-xl mb-3" style={{ color: 'var(--color-text)' }}>
            11. Intellectual property
          </h2>
          <p>
            All content, branding, and software comprising MissedCallAI is owned by or licensed
            to Rijas Panthayil Baby Suresh. You are granted a limited, non-exclusive,
            non-transferable licence to use the service for your own business purposes.
            You may not copy, modify, or distribute any part of the service without our
            written permission.
          </p>
        </section>

        <section>
          <h2 className="font-display font-black uppercase text-xl mb-3" style={{ color: 'var(--color-text)' }}>
            12. Governing law
          </h2>
          <p>
            These terms are governed by the laws of England and Wales. Any disputes arising
            from these terms or your use of MissedCallAI shall be subject to the exclusive
            jurisdiction of the courts of England and Wales.
          </p>
        </section>

        <section>
          <h2 className="font-display font-black uppercase text-xl mb-3" style={{ color: 'var(--color-text)' }}>
            13. Changes to these terms
          </h2>
          <p>
            We may update these Terms of Service from time to time. We will notify you of
            material changes by email at least 14 days before they take effect. Continued
            use of the service after that date constitutes acceptance of the updated terms.
          </p>
        </section>

      </div>
    </main>
  )
}