// src/app/contact/page.tsx
import type { Metadata } from 'next'
import Image from 'next/image'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ContactForm } from '@/components/contact/ContactForm'
import { CONTACT } from '@/constants/contact'

export const metadata: Metadata = {
  title: 'Contact — MissedCall AI',
  description:
    'Got a question about MissedCall AI? Get in touch with Rijas directly via email or WhatsApp. Built for UK tradespeople.',
  alternates: { canonical: 'https://missedcallai.co.uk/contact' },
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-body text-[11px] font-semibold uppercase tracking-widest text-(--color-accent) mb-4">
      {children}
    </p>
  )
}

export default function ContactPage() {
  return (
    <main>
      <Navbar />

      <section className="border-b border-(--color-border) bg-(--color-surface) px-6 pt-16 pb-12">
        <div className="max-w-215 mx-auto">
          <div className="inline-block bg-(--color-surface-2) border border-(--color-border-2) text-(--color-accent) font-body text-[11px] font-semibold uppercase tracking-widest px-3.5 py-1.5 mb-5">
            {CONTACT.heading.eyebrow}
          </div>

          <h1 className="font-display font-black uppercase leading-none text-[clamp(52px,8vw,84px)] tracking-[-0.01em] mb-5">
            {CONTACT.heading.headline}
          </h1>

          <p className="text-[17px] text-(--color-muted) leading-relaxed max-w-135">
            {CONTACT.heading.sub}
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-215 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          <div>
            <SectionLabel>Send a message</SectionLabel>
            <ContactForm />
          </div>

          <div className="flex flex-col gap-5">

            <div className="bg-(--color-surface) border border-(--color-border-2) p-7">
              <SectionLabel>Who you&apos;re talking to</SectionLabel>

              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 shrink-0 bg-(--color-surface-2) border border-(--color-border-2) overflow-hidden relative">
                  <Image
                    src={CONTACT.founder.image}
                    alt={CONTACT.founder.shortName}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>

                <div>
                  <p className="font-display text-[22px] font-black uppercase leading-tight mb-1">
                    {CONTACT.founder.shortName}
                  </p>
                  <p className="text-[13px] text-(--color-muted)">
                    {CONTACT.founder.role}
                  </p>
                </div>
              </div>

              <p className="text-[14px] text-(--color-muted) leading-relaxed border-t border-(--color-border) pt-4 mb-4">
                {CONTACT.founder.bio}
              </p>

              <div className="flex items-start gap-3 bg-(--color-surface-2) border border-(--color-border-2) px-3.5 py-3">
                <div className="w-2 h-2 rounded-full bg-green-500 shrink-0 mt-1.25" />
                <div>
                  <p className="font-body text-[11px] font-semibold uppercase tracking-widest text-green-500 mb-0.5">
                    Best times to reach me
                  </p>
                  <p className="text-[13px] text-(--color-muted)">
                    {CONTACT.availability}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-(--color-surface) border border-(--color-border-2) p-7">
              <SectionLabel>Or reach me directly</SectionLabel>

              <a
                href={`https://wa.me/${CONTACT.whatsapp}?text=Hi%20Rijas%2C%20I%20found%20MissedCall%20AI%20and%20had%20a%20question...`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-(--color-surface-2) border border-(--color-border-2) px-4 py-3.5 mb-2.5 no-underline transition-colors hover:border-(--color-accent) group"
              >
                <div>
                  <p className="text-[13px] font-semibold text-(--color-text) mb-0.5">WhatsApp</p>
                  <p className="text-[12px] text-(--color-muted)">{CONTACT.whatsappDisplay}</p>
                </div>
              </a>

              <a
                href={`mailto:${CONTACT.email}?subject=Hi%20Rijas&body=I%20found%20MissedCall%20AI%20and%20have%20a%20question...`}
                className="flex items-center gap-3 bg-(--color-surface-2) border border-(--color-border-2) px-4 py-3.5 no-underline transition-colors hover:border-(--color-accent) group"
                >
                <div>
                    <p className="text-[13px] font-semibold text-(--color-text) mb-0.5">Email</p>
                    <p className="text-[12px] text-(--color-muted)">{CONTACT.email}</p>
                </div>
              </a>

              <p className="text-xs text-[#444] mt-3.5 leading-relaxed">
                I aim to reply within 24 hours. For quickest response, WhatsApp is best.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}