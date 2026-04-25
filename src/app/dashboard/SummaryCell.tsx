'use client'
import { useState } from 'react'

export default function SummaryCell({ summary }: { summary: string | null }) {
  const [open, setOpen] = useState(false)
  const text = summary ?? 'No summary recorded'

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-left line-clamp-2 text-[var(--color-muted)] hover:text-white transition-colors cursor-pointer"
      >
        {text}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-[var(--color-bg)] border border-white/10 rounded-lg p-6 max-w-lg w-full"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="font-display font-black uppercase text-lg mb-4">
              Call <span className="text-[var(--color-accent)]">Summary</span>
            </h3>
            <p className="text-[var(--color-muted)] text-sm leading-relaxed whitespace-pre-wrap">
              {text}
            </p>
            <button
              onClick={() => setOpen(false)}
              className="mt-6 text-xs text-[var(--color-muted)] hover:text-white transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}