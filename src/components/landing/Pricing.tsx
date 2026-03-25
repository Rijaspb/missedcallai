import { PRICING } from '@/constants/landing'
import { SectionLabel } from '@/components/shared/SectionLabel'

export function Pricing() {
  return (
    <section
      className="px-6 py-16 md:py-24 max-w-4xl mx-auto border-t"
      style={{ borderColor: 'var(--color-border)' }}>
      <SectionLabel text="Pricing" />
      <h2 className="font-display font-black uppercase leading-tight text-4xl md:text-5xl mb-12">
        Simple pricing.<br />
        <span style={{ color: 'var(--color-accent)' }}>No surprises.</span>
      </h2>

      <div
        className="relative border max-w-md mx-auto p-8 md:p-10"
        style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border-2)' }}>
        {/* Orange top bar */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: 'var(--color-accent)' }}
        />

        <div
          className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 mb-6 border"
          style={{
            background: 'var(--color-surface-2)',
            borderColor: 'var(--color-accent)',
            color: 'var(--color-accent)',
          }}>
          {PRICING.badge}
        </div>

        <div className="font-display font-black leading-none mb-1">
          <span className="text-6xl">{PRICING.amount}</span>
          <span className="text-2xl" style={{ color: 'var(--color-subtle)' }}>{PRICING.period}</span>
        </div>
        <p className="text-sm mb-8" style={{ color: 'var(--color-subtle)' }}>{PRICING.note}</p>

        <ul
          className="flex flex-col gap-3 mb-8 pb-8 border-b"
          style={{ borderColor: 'var(--color-surface-2)' }}>
          {PRICING.features.map((f) => (
            <li
              key={f}
              className="flex items-center gap-3 text-sm"
              style={{ color: 'var(--color-muted)' }}>
              <span style={{ color: 'var(--color-accent)' }}>✓</span>
              {f}
            </li>
          ))}
        </ul>

        <button
          className="w-full py-4 text-sm font-bold uppercase tracking-widest transition-opacity hover:opacity-80"
          style={{ background: 'var(--color-accent)', color: '#0D0D0D', fontFamily: 'var(--font-body)' }}>
          {PRICING.cta}
        </button>

        <p className="text-xs text-center mt-3" style={{ color: '#444' }}>
          {PRICING.subNote}
        </p>
      </div>
    </section>
  )
}