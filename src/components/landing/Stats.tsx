import { STATS } from '@/constants/landing'
import { SectionLabel } from '@/components/shared/SectionLabel'

export function Stats() {
  return (
    <section
      className="px-6 py-16 md:py-24 max-w-4xl mx-auto border-t"
      style={{ borderColor: 'var(--color-border)' }}>
      <SectionLabel text="Stats" />
      <h2 className="font-display font-black uppercase leading-tight text-4xl md:text-5xl mb-12">
        The numbers{' '}
        <span style={{ color: 'var(--color-accent)' }}>don&apos;t lie</span>
      </h2>

      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-px"
        style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-surface-2)' }}>
        {STATS.map((stat) => (
          <div
            key={stat.num}
            className="p-8 text-center"
            style={{ background: 'var(--color-bg)' }}>
            <div
              className="font-display font-black text-5xl leading-none"
              style={{ color: 'var(--color-accent)' }}>
              {stat.num}
            </div>
            <div
              className="text-xs uppercase tracking-wider mt-2"
              style={{ color: 'var(--color-subtle)' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}