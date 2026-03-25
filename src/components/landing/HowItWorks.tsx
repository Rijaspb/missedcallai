import { STEPS } from '@/constants/landing'
import { SectionLabel } from '@/components/shared/SectionLabel'

export function HowItWorks() {
  return (
    <section
      className="px-6 py-16 md:py-24 max-w-4xl mx-auto border-t"
      style={{ borderColor: 'var(--color-border)' }}>
      <SectionLabel text="How It Works" />
      <h2 className="font-display font-black uppercase leading-tight text-4xl md:text-5xl mb-12">
        Set up in{' '}
        <span style={{ color: 'var(--color-accent)' }}>10 minutes.</span>
        <br />Works forever.
      </h2>

      {/* Steps grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-px mb-12"
        style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-surface-2)' }}>
        {STEPS.map((step) => (
          <div
            key={step.num}
            className="p-8"
            style={{ background: 'var(--color-bg)' }}>
            <div
              className="font-display font-black text-5xl leading-none mb-4"
              style={{ color: 'var(--color-surface-2)' }}>
              {step.num}
            </div>
            <h3
              className="font-display font-bold uppercase text-lg mb-2"
              style={{ color: 'var(--color-text)' }}>
              {step.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-subtle)' }}>
              {step.body}
            </p>
          </div>
        ))}
      </div>

      {/* SMS mockup */}
      <div
        className="rounded-xl p-6 max-w-sm mx-auto border"
        style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
        <div
          className="text-xs uppercase tracking-widest mb-4 pb-3 border-b"
          style={{ color: '#444', borderColor: 'var(--color-surface-2)' }}>
          MissedCall AI — New Lead
        </div>
        <div
          className="rounded-lg rounded-bl-sm p-4 text-sm leading-relaxed"
          style={{ background: 'var(--color-surface-2)', color: '#D0CEC8' }}>
          <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>
            New missed call — McGill&apos;s Plumbing
          </span>
          <br /><br />
          Caller:{' '}
          <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>John Thomson</span><br />
          Number:{' '}
          <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>07712 345 678</span><br />
          Message: Boiler not working, needs urgent fix. Available all day tomorrow.
          <br /><br />
          <span className="text-xs" style={{ color: 'var(--color-subtle)' }}>
            Call received 14:32 — while you were on a job
          </span>
        </div>
        <div className="text-xs mt-2 text-right" style={{ color: '#444' }}>
          Delivered 14:32
        </div>
      </div>
    </section>
  )
}