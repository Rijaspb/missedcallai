'use client'

import Link from 'next/link'
import { useState } from 'react'

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-(--color-border) bg-(--color-bg)">
      <div className="flex items-center justify-between px-5 py-4 max-w-6xl mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-lg font-black uppercase tracking-wide text-(--color-text) no-underline"
        >
          <span className="text-(--color-accent)">Missed</span>Call AI
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="text-sm font-semibold uppercase tracking-wide text-(--color-muted) hover:text-(--color-text) px-3 py-2"
          >
            Contact
          </Link>

          <Link
            href="/signup"
            className="text-xs font-bold uppercase tracking-widest px-5 py-2.5 bg-(--color-accent) text-black hover:opacity-80"
          >
            Start Free Trial
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-(--color-border)"
        >
          <div className="space-y-1.5">
            <span className="block w-5 h-0.5 bg-(--color-text)"></span>
            <span className="block w-5 h-0.5 bg-(--color-text)"></span>
            <span className="block w-5 h-0.5 bg-(--color-text)"></span>
          </div>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden px-5 pb-5 pt-2 border-t border-(--color-border) bg-(--color-bg) animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-3">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="w-full text-center text-sm font-semibold uppercase tracking-wide text-(--color-text) px-4 py-3 rounded-lg border border-(--color-border)"
            >
              Contact
            </Link>

            <Link
              href="/signup"
              onClick={() => setOpen(false)}
              className="w-full text-center text-sm font-bold uppercase tracking-widest px-4 py-3 rounded-lg bg-(--color-accent) text-black"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}