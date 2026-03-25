'use client'
import { useState } from 'react'
import { FAQS } from '@/constants/landing'
import { SectionLabel } from '@/components/shared/SectionLabel'

export function Faq() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section
      className="px-6 py-16 md:py-24 max-w-4xl mx-auto border-t"
      style={{ borderColor: 'var(--color-border)' }}>
      <SectionLabel text="FAQ" />
      <h2 className="font-display font-black uppercase leading-tight text-4xl md:text-5xl mb-12">
        Questions{' '}
        <span style={{ color: 'var(--color-accent)' }}>tradesmen ask</span>
      </h2>

      <div
        className="flex flex-col gap-px"
        style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-surface-2)' }}>
        {FAQS.map((faq, i) => (
          <div
            key={i}
            className="p-6 cursor-pointer transition-colors hover:bg-white/5"
            style={{ background: 'var(--color-bg)' }}
            onClick={() => setOpen(open === i ? null : i)}>
            <div className="flex items-center justify-between gap-4 font-semibold text-sm"
              style={{ color: 'var(--color-text)' }}>
              <span>{faq.q}</span>
              <span
                className="text-lg shrink-0"
                style={{ color: 'var(--color-accent)' }}>
                {open === i ? '−' : '+'}
              </span>
            </div>
            {open === i && (
              <p
                className="text-sm leading-relaxed mt-3"
                style={{ color: 'var(--color-subtle)' }}>
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}