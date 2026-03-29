import Link from 'next/link'

const NAV_LINKS = [
  // { href: '/#how-it-works', label: 'How it works' },
  // { href: '/#pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
]

export function Footer() {
  return (
    <footer className="px-5 py-10 border-t border-(--color-surface-2) bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        
        {/* Top section */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          
          {/* Logo */}
          <Link
            href="/"
            className="font-display font-black uppercase text-base tracking-wide text-(--color-text) no-underline"
          >
            <span className="text-(--color-accent)">Missed</span>Call AI
          </Link>

          {/* Nav links */}
          <nav className="flex flex-col gap-3 md:flex-row md:gap-6">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium uppercase tracking-[0.06em] text-[#444] hover:text-(--color-muted) transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="mt-8 pt-5 border-t border-[#1A1A1A]" />

        {/* Bottom section */}
        <div className="flex flex-col gap-2 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <p className="text-xs text-[#444]">
            missedcallai.co.uk · Built in Glasgow · For UK Tradespeople
          </p>

          <p className="text-xs text-[#333]">
            © 2026 MissedCall AI
          </p>
        </div>
      </div>
    </footer>
  )
}