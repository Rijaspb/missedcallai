import { HERO } from '@/constants/landing'

export function Hero() {
  return (
    <section className="px-6 pt-16 pb-14 md:pt-20 md:pb-16 max-w-4xl mx-auto">
      <div
        className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1.5 mb-6 border"
        style={{
          background: 'var(--color-surface)',
          borderColor: 'var(--color-border-2)',
          color: 'var(--color-accent)',
        }}>
        {HERO.eyebrow}
      </div>

      <h1
        className="font-display font-black uppercase leading-none mb-6 text-5xl md:text-7xl lg:text-8xl">
        {HERO.headline1}<br />
        is a <span style={{ color: 'var(--color-accent)' }}>missed job.</span>
      </h1>

      <p className="text-lg leading-relaxed mb-10 max-w-xl" style={{ color: 'var(--color-muted)' }}>
        {HERO.sub}
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          className="text-sm font-bold uppercase tracking-widest px-8 py-4 transition-opacity hover:opacity-80"
          style={{ background: 'var(--color-accent)', color: '#0D0D0D', fontFamily: 'var(--font-body)' }}>
          {HERO.cta}
        </button>
        <button
          className="text-sm font-medium px-6 py-4 border transition-colors hover:bg-white/5"
          style={{ borderColor: 'var(--color-border-2)', color: 'var(--color-text)', fontFamily: 'var(--font-body)' }}>
          {HERO.secondary} ↓
        </button>
      </div>
    </section>
  )
}