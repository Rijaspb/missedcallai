import { TRUST_ITEMS } from '@/constants/landing'

export function TrustBar() {
  return (
    <div
      className="px-6 py-4 flex flex-wrap items-center gap-4 border-y"
      style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
      <span
        className="text-xs font-semibold uppercase tracking-widest whitespace-nowrap"
        style={{ color: 'var(--color-subtle)' }}>
        Trusted by
      </span>
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {TRUST_ITEMS.map((item) => (
          <span
            key={item}
            className="flex items-center gap-1.5 text-sm font-medium"
            style={{ color: 'var(--color-subtle)' }}>
            <span
              className="w-1.5 h-1.5 shrink-0 inline-block"
              style={{ background: 'var(--color-accent)' }}
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}