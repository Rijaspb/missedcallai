export function FinalCta() {
  return (
    <section
      className="px-6 py-20 text-center border-t"
      style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
      <p
        className="text-xs font-semibold uppercase tracking-widest mb-4"
        style={{ color: 'var(--color-accent)' }}>
        Get Started
      </p>
      <h2 className="font-display font-black uppercase leading-tight text-4xl md:text-5xl max-w-lg mx-auto mb-4">
        Stop losing jobs to{' '}
        <span style={{ color: 'var(--color-accent)' }}>missed calls.</span>
      </h2>
      <p className="text-sm mb-8" style={{ color: 'var(--color-subtle)' }}>
        Join tradespeople across Scotland already using MissedCall AI.
      </p>
      <button
        className="text-sm font-bold uppercase tracking-widest px-8 py-4 transition-opacity hover:opacity-80"
        style={{ background: 'var(--color-accent)', color: '#0D0D0D', fontFamily: 'var(--font-body)' }}>
        Start Your Free Trial
      </button>
    </section>
  )
}