import { HERO } from '@/constants/landing'

export function Hero() {
  return (
    <section className="px-6 pt-8 pb-10 md:pt-12 md:pb-16 max-w-4xl mx-auto">
  <div
    className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1.5 mb-5 border"
    style={{
      background: 'var(--color-surface)',
      borderColor: 'var(--color-border-2)',
      color: 'var(--color-accent)',
    }}>
    {HERO.eyebrow}
  </div>

  <h1
    className="font-display font-black uppercase leading-none mb-5 text-5xl md:text-7xl lg:text-8xl">
    {HERO.headline1}<br />
    is a <span style={{ color: 'var(--color-accent)' }}>missed job.</span>
  </h1>

  <p className="text-lg leading-relaxed mb-8 max-w-xl" style={{ color: 'var(--color-muted)' }}>
    {HERO.sub}
  </p>

  <div className="mb-8">
    <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--color-accent)' }}>
      TRY IT RIGHT NOW (FREE LIVE DEMO)
    </p>

    <div
      className="p-4 border rounded-xl mb-5"
      style={{
        borderColor: 'var(--color-border-2)',
        background: 'var(--color-surface)',
      }}
    >
      <a href={`tel:${HERO.demoNumber}`} className="text-xl font-bold mb-1.5 block">
        Call: <span style={{ color: 'var(--color-accent)' }}>{HERO.demoNumberDisplay}</span>
      </a>

      <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
        {HERO.demoPrompt}
      </p>
    </div>

    <div className="flex flex-col sm:flex-row gap-3">
      <button
        className="text-sm font-bold uppercase tracking-widest px-8 py-4 transition-opacity hover:opacity-80"
        style={{
          background: 'var(--color-accent)',
          color: '#0D0D0D',
          fontFamily: 'var(--font-body)',
        }}
      >
        Start free trial
      </button>

      <a
        href={`tel:${HERO.demoNumber}`}
        className="text-sm font-bold uppercase tracking-widest px-8 py-4 text-center transition-opacity hover:opacity-80 border"
        style={{
          borderColor: 'var(--color-text)',
          color: 'var(--color-text)',
          fontFamily: 'var(--font-body)',
        }}
      >
        Tap to call
      </a>
    </div>
  </div>
</section>
  )
}