export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-5 border-b"
      style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
      <div className="font-display text-xl font-black uppercase tracking-wide">
        <span style={{ color: 'var(--color-accent)' }}>Missed</span>Call AI
      </div>
      <button
        className="text-xs font-bold uppercase tracking-widest px-5 py-2.5 transition-opacity hover:opacity-80"
        style={{ background: 'var(--color-accent)', color: '#0D0D0D', fontFamily: 'var(--font-body)' }}>
        Start Free Trial
      </button>
    </nav>
  )
}