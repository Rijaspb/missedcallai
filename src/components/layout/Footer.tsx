export function Footer() {
  return (
    <footer
      className="px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t"
      style={{ background: '#0A0A0A', borderColor: 'var(--color-surface-2)' }}>
      <div className="font-display font-black uppercase text-base tracking-wide">
        <span style={{ color: 'var(--color-accent)' }}>Missed</span>Call AI
      </div>
      <p className="text-xs" style={{ color: '#444' }}>
        missedcallai.co.uk &nbsp;·&nbsp; Built in Glasgow &nbsp;·&nbsp; For UK Tradespeople
      </p>
      <p className="text-xs" style={{ color: '#333' }}>
        © 2026 MissedCall AI Ltd
      </p>
    </footer>
  )
}