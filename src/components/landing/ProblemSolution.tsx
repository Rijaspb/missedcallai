import { PROBLEMS, SOLUTIONS } from '@/constants/landing'
import { SectionLabel } from '@/components/shared/SectionLabel'

export function ProblemSolution() {
  return (
    <section
      className="px-6 py-16 md:py-24 max-w-4xl mx-auto border-t"
      style={{ borderColor: 'var(--color-border)' }}>
      <SectionLabel text="The Problem" />
      <h2 className="font-display font-black uppercase leading-tight text-4xl md:text-5xl mb-12">
        You can't answer{' '}
        <span style={{ color: 'var(--color-accent)' }}>every call</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-10 md:gap-12">
        {/* Without */}
        <div>
          <h3
            className="font-display font-bold uppercase text-lg mb-5"
            style={{ color: 'var(--color-subtle)' }}>
            Without MissedCall AI
          </h3>
          <ul className="flex flex-col gap-3">
            {PROBLEMS.map((p) => (
              <li
                key={p}
                className="flex gap-3 text-sm leading-relaxed"
                style={{ color: 'var(--color-muted)' }}>
                <span className="shrink-0" style={{ color: '#444' }}>✕</span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Divider — hidden on mobile */}
        <div
          className="hidden md:block"
          style={{ background: 'var(--color-border)' }}
        />

        {/* With */}
        <div>
          <h3
            className="font-display font-bold uppercase text-lg mb-5"
            style={{ color: 'var(--color-accent)' }}>
            With MissedCall AI
          </h3>
          <ul className="flex flex-col gap-3">
            {SOLUTIONS.map((s) => (
              <li
                key={s}
                className="flex gap-3 text-sm leading-relaxed"
                style={{ color: 'var(--color-muted)' }}>
                <span className="shrink-0" style={{ color: 'var(--color-accent)' }}>✓</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}